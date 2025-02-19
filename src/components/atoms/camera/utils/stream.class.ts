type PermissionType = {
    is_granted: boolean;
    err_name?: string;
    err_msg?: string;
};

export default class Stream extends EventTarget {
    private onDisconnectEvent = new CustomEvent("disconnected");
    private _devices = navigator.mediaDevices;
    public selectedDevice!: MediaStreamConstraints;
    public permission: PermissionType = { is_granted: false };
    private streamedDevice?: MediaStream;
    public cameras: MediaDeviceInfo[] = [];

    constructor() {
        super();
    }

    public async init() {
        await this.getPermission();
    }

    public async getCameras(): Promise<MediaDeviceInfo[]> {
        if (!this.permission.is_granted) {
            throw new Error("Permission denied");
        }

        try {
            const devices = await this._devices.enumerateDevices();
            this.cameras = devices.filter((device) => device.kind === "videoinput");

            if (this.cameras.length > 0) {
                this.selectedDevice = { video: { deviceId: this.cameras[0].deviceId } };
            }
            return this.cameras;
        } catch (err) {
            console.error("Error enumerating devices:", err);
            return [];
        }
    }

    public async getPermission() {
        try {
            //const constraints = device ?? { video: true, audio: false };
            // Query the permission status of the camera
            const permissionStatus = await navigator.permissions.query({ name: "camera" as PermissionName });
    
            if (permissionStatus.state === "granted") {
                this.permission = { is_granted: true };
                console.log("Camera permission already granted.");
                return true;
            } else if (permissionStatus.state === "prompt") {
                console.log("Camera permission will prompt on first access.");
                // Permission not granted yet, user will be prompted when accessing camera
                throw new Error("Camera permission will prompt on first access.");
                
            } else {
                console.log("Camera permission denied.");
                throw new Error("Camera permission denied.");
            }
        } catch (e: any) {
            this.permission = { is_granted: false, err_name: e.name, err_msg: e.message };
            //console.error("Permission denied:", e);
            throw new Error("Permission denied");
        }
    }

    public onDisconnect(fn: EventListenerOrEventListenerObject | null) {
        this.addEventListener("disconnected", fn);
    }

    public async startVideoStream(constraints = this.selectedDevice): Promise<MediaStream> {
        if (!this.permission.is_granted) {
            throw new Error("Permission denied");
        }

        try {
            this.streamedDevice = await this._devices.getUserMedia(constraints);
            const [currentCamera] = this.streamedDevice.getVideoTracks();

            currentCamera.onended = () => {
                this.dispatchEvent(this.onDisconnectEvent);
                console.log("Camera disconnected");
            };

            return this.streamedDevice;
        } catch (e) {
            //console.error("Error starting video stream:", e);
            throw new Error("Permission denied");
        }
    }

    public stopVideoStream(streamedDevice = this.streamedDevice) {
        if (!streamedDevice) return false;

        try {
            streamedDevice.getTracks().forEach((track) => track.stop());
            return true;
        } catch (error) {
            console.error("Error stopping video stream:", error);
            throw error;
        }
    }

    public async changeCamera(deviceId: string): Promise<MediaStream | void> {
        try {
            this.stopVideoStream()

            if (deviceId) {
                this.selectedDevice = { video: { deviceId } };
                return await this.startVideoStream();
            } else {
                this.selectedDevice.video = false;
                console.warn("No device selected");
            }

        } catch (error) {
            throw error;
        }
    }
}

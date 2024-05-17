type PermissionType = {
    is_granted: boolean
    err_name?: string
    err_msg?: string
}

export default class Stream  extends EventTarget{
    constructor(){
        super();
        this.onDiconnectEvent = new CustomEvent("disconnected");
        //this.init({video, audio})
    }
    public init(device: MediaStreamConstraints ){
        this.getPermission(device)
    }
    private onDiconnectEvent : CustomEvent
    private _devices = navigator.mediaDevices
    private _deviceContriants!:MediaStreamConstraints
    public permission: PermissionType = {
        is_granted: false
    }
    public streamedDevice!: MediaStream
    public cameras!: any[]
    public getCameras = async ()=>{

        if(this.permission.is_granted){
            return await this._devices.enumerateDevices().then(devices=>{
                //console.log(devices);
                
                this.cameras = devices.filter(device => device.kind === 'videoinput');
                
                return this.cameras
            }).catch(err=>{
                console.error(err);
            });
        }

        throw Error(" permission denied")
    }

    public async getPermission(device?:MediaStreamConstraints ){
      
        this._deviceContriants = device??{video: true, audio: false}
        
        await navigator.mediaDevices
        .getUserMedia( this._deviceContriants)
        .then((stream) => {
            
            this.streamedDevice = stream

            this.permission = {
                is_granted: true
            }
            //this.stopVideo(this.streamedDevice)
        }).catch((e)=>{
           // console.log("permission denied");
            this.permission = {
                is_granted: false,
                err_name: e.ErrName,
                err_msg: e.ErrMsg
            }
            throw Error("permission denied")
        })
        return this
    }
    public onDiconnect(fn: EventListenerOrEventListenerObject | null){
        
        this.addEventListener("disconnected", fn);
    }

    public async startVideoStream(constraints = this._deviceContriants){
        //console.log(constraints);

        if(this.permission.is_granted){

            await navigator.mediaDevices
            .getUserMedia( constraints)
            .then((stream) => {
                
                this.streamedDevice = stream

                const [currentCamera] = this.streamedDevice.getVideoTracks()

                //console.log(this.streamedDevice, currentCamera);

                currentCamera.onended = () =>{
                    
                    this.dispatchEvent(this.onDiconnectEvent);
                    
                    console.log('someone unplugged the webcam');
                }

            }).catch((e)=>{
                console.log(e, "permission denied");
            })
            
            
            return this.streamedDevice
        }

        throw Error("permission denied")
    }

    public stopVideoStream = (streamedDivece = this.streamedDevice)=>{
        try {
            //console.log(streamedDivece?.getTracks());
            
            streamedDivece?.getTracks().forEach(track => track.stop())
            return true
        } catch (error) {
            console.error(error);
        }
    }

    public changeCamera(deviceId: string){
        // stop all devices
        if(this.stopVideoStream()){
            if(deviceId){
                this._deviceContriants.video = {deviceId}
                  // run selected device
                return this.startVideoStream()
            }else{
                this._deviceContriants.video =  false
                //throw Error('no device')
            }
           
        }
    }
}
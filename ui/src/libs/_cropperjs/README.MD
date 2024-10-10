# Image Cropper

Vue-Cropper is a lightweight (311 bytes gzip), zero-dependency sorting library with TypeScript support. this package is based on  [cropperjs](https://github.com/fengyuanchen/cropperjs).

[![NPM](https://nodei.co/npm/@trandx/vue-cropper.png?downloads=true)](https://nodei.co/npm/vue-cropperjs/)

<!-- ## Demo -->

<!-- Checkout here **[agontuk.github.io/vue-cropperjs](https://agontuk.github.io/vue-cropperjs/)** -->

## Installation

```shell
npm install --save @trandx/vue-cropper
```
or
```
yarn add @trandx/vue-cropper
```
> You will also need css & style loader for webpack

# Compatibility
| Vue Version | Package Version |
| ---------- | --------------- |
| 3.x.x      | >=1.0.0         |

## Usage

```js
// Global
import Vue from 'vue';
import Cropper from '@trandx/vue-cropper';
import '@trandx/vue-cropper/index.css';
Vue.component(VueCropper);

// Local
import Cropper from '@trandx/vue-cropper';
import '@trandx/vue-cropper/index.css';
export default {
  components: { VueCropper}
}

...
<Cropper
  ref="cropper"
  :src="imgSrc"
  alt="Source Image"
  @ready="..."
  @cropstart="..."
  @cropmove="..."
  @cropend="..."
  @crop="..."
  @zoom="..."
/>
...

this.$refs.cropper.rotate(45);
```

See the [example](https://github.com/Agontuk/vue-cropperjs/tree/master/example) files & [cropperjs](https://github.com/fengyuanchen/cropperjs#cropperjs) documentation

## Options

| Name           | Type     | Required | Description                     |
| -------------- | -------- | -------- | ------------------------------- |
| src            | `string` | --       | Image source                    |
| containerStyle | `object` | --       | Styling for the image container |
| imgStyle       | `object` | --       | Styling for the image           |
| alt            | `string` | --       | Alternate text for the image    |



### Renamed Methods

- `relativeZoom` from `zoom`
- `initCrop` from `crop`


## If Issues

In case you notice any irregularities in benchmark or you want to add sort library to benchmark score
please open issue [here](https://github.com/Trandx/vue-cropper)

## More about Cropperjs

See cropperjs [documentation](https://github.com/fengyuanchen/cropperjs#options) for all posible options & methods.

## Author

[![alt text](https://avatars.githubusercontent.com/u/42522718?v=4)](https://github.com/Trandx/sortable)
import { writable } from 'svelte/store';

let key = ['PGvWMBLAesPlYxIYXd3ovF6PutIZQg1S9q0thypN', 'QGoSHO65AKDc13zOvmMsg67OalwXIIFWaCQRssyb']

export const oStore = {
  observable: writable([]),
  parse: function () {
    Parse.serverURL = 'https://nossajornada.back4app.io';
    Parse.initialize( key[0], key[1] );
  },
  set: function() {
    return new Promise((resolve, reject) => {
      const Photo = Parse.Object.extend('Photo'),
      query = new Parse.Query(Photo);
  
      query.find()
      .then($result => {
        oStore.observable.set($result);
        resolve("-- FILES LOADED");
      }).catch($error => {
        /* alert("error :: " + $error); */
        reject($error);
      });
    })
  },
  get: function() {
    let store;
    this.observable.subscribe($result => {
      let array = $result,
      updated = array.map($item => {
        if(!$item) return;
        let orientation = 0;
        loadImage($item.attributes.image._url, function ($img, $data) {
          if($data && $data.exif) {            
            orientation = $data.exif.get("Orientation");
          }
        }, { meta: true });
        $item.attributes.image._orientation = orientation;        
      })
      debugger;
      store = updated;
    });
    return store;
  }
}
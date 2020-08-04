# move-ember-components
Move your Ember.js components to different folders within `app/components` and 
update their references in the templates


## Install
```
npm i -g move-ember-components
```

## Usage
```
mec <source-path> <destination-path>
```

```
mec hello-world module-hello-world
```

This will move the component `app/components/hello-world` to  `app/components/module-hello-world/hello-world`.



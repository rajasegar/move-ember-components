# move-ember-components
Move your Ember.js components to different folders within `app/components` and 
update their references in the templates using codemods.


## Install
```
npm i -g move-ember-components
```

## Usage
```
move-ember-components <source-path> <destination-path>
```

You can also use the shorthand version `mec` for the cli

```
mec <source-path> <destination-path>
```

```
mec hello-world module-hello-world
```

This will move the component `app/components/hello-world` to  `app/components/module-hello-world/hello-world`.

This will output something like:

```
Moving component.js
---------------
app/components/hello-world/component.js
app/components/module-hello-world/hello-world/component.js

Moving component template.hbs
-------------------------
app/components/hello-world/template.hbs
app/components/module-hello-world/hello-world/template.hbs

Moving component tests
------------------
tests/integration/components/hello-world/component-test.js
tests/integration/components/module-hello-world/hello-world/component-test.js

Success: Component Template hello-world.hbs moved
Success: Component Test hello-world.js moved
Success: Component hello-world.js moved

Processing 767 files...
Spawning 11 workers...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 17 files to free worker...
All done.
Results:
0 errors
764 unmodified
2 skipped
1 ok
Time elapsed: 7.608seconds

```

For dry run you can pass in the `--dry-run` or `-d` option

```
mec hello-world module-hello-world --dry-run
```




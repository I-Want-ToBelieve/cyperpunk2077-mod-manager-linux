# cyperpunk2077-mods-manager-linux


To install dependencies:

```bash
bun install
```

To run:

```bash
bun index.ts
```

# usage

see https://wiki.redmodding.org/cyberpunk-2077-modding/for-mod-users/users-modding-cyberpunk-2077/modding-on-linux

- git clone the repo then cd to the repo path
- need nix and direnv
- run `direnv allow .`
- change sources and target in index.ts then put mods to the sources path then run bun index.ts.


**There is currently no uninstall feature**


This project was created using `bun init` in bun v1.0.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

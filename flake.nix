{
  description = "cyperpunk2077-mod-manager-devel";

  inputs = {nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";};

  outputs = {
    self,
    nixpkgs,
    ...
  }: let
    pkgsFor = system:
      import nixpkgs {
        inherit system;
        overlays = [];
      };

    targetSystems = ["aarch64-linux" "x86_64-linux"];
  in {
    devShells = nixpkgs.lib.genAttrs targetSystems (system: let
      pkgs = pkgsFor system;
    in {
      default = pkgs.mkShell {
        name = "cyperpunk2077-mod-manager-devel";
        nativeBuildInputs = with pkgs; [
          bun
          typescript

          libsForQt5.ark
          eza
        ];
      };
    });
  };
}

# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.openssl_3_1
    pkgs.sudo
    pkgs.docker

  ];
  # Sets environment variables in the workspace
  env = { PORT="http://localhost:3000";};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "angular.ng-template"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "src/app/app.component.ts" ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
      onStart = {
        watch-frontend = "ng serve";
      };
    };
    # Enable previews and customize configuratio
    /*previews = {
      enable = true;
      previews = {
        web = {
          command = [ "npm" "run" "start" "--" "--port" "$PORT" "--host" "0.0.0.0" "--disable-host-check" ];
          manager = "web";
        };
      };
    };*/
  };
}

import ImageColors from "react-native-image-colors"

export interface FilmImageColors {
  primary: string;
  secondary: string; 
}

export const getImageColors = (uri: string): Promise<[string, string]> => {
  return new Promise<[string, string]>((resolve, reject) => {
    ImageColors.getColors(uri, {
      fallback: "#FFFFFF",
      key: "unique_key",
    })
      .then((colors) => {
        let primary;
        let secondary;
        switch (colors.platform) {
          case "android":
            primary = colors.dominant;
            secondary = colors.average;
            break;
          case "web":
            primary = colors.dominant;
            secondary = colors.vibrant;
            break;
          case "ios":
            primary = colors.primary;
            secondary = colors.secondary;
            break;
          default:
            primary = "#FFFFFF";
            secondary = "#FFFFFF";
            break;
        }
        resolve([primary , secondary]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

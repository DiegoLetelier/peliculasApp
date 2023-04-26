import { createContext, useState } from "react";

export interface ImageColors {
 primary: string,
 secondary: string

}

interface ContextProps {
 colors: ImageColors;
 prevColors: ImageColors;
 setMainColors: (colors: ImageColors) => void;
 setPrevMainColors: (colors: ImageColors) => void; 
}

export const GradientContext = createContext({} as ContextProps); // todo : define type

export const GradientProvider = ({children}: any)  => {

const [colors, setColors] = useState<ImageColors>({
 primary : 'transparent',
 secondary : 'transparent'
})

const [prevColors, setPrevColors] = useState<ImageColors>({
    primary : 'transparent',
    secondary : 'transparent'
   })


  

const setMainColors = (colors:any) => {
  console.log('set Main colors')
 setColors ( colors );

}

const setPrevMainColors = () => {
    setPrevColors ( colors );
   
   }


return (
    
    <GradientContext.Provider
    value ={{
    colors,
    prevColors,
    setMainColors,
    setPrevMainColors
    
    }}
    >


        {children}
    </GradientContext.Provider>
    
    
    )


}
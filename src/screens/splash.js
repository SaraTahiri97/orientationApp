import React, { useEffect } from 'react'
import {
    Splash_Container, Splash_Title, Splash_Image_Text
} from '../components/elements'

const splash = ({navigation})=> {
  
    setTimeout(() => {
        navigation.navigate('Login_Screen')
       
    }, 7000);
   
/* 
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('SignInScreen')
           
        }, 30);
	}, []) */
    return (

        <Splash_Container>
            <Splash_Title Splash_SubTitle="Salut." Splash_Title="Bienvenue !"  />
            <Splash_Image_Text
                Splash_Image={require('../components/images/pictureView.png')}
                Splash_Text="La meilleure façon de prédire l'avenir est de le créer ! Illuminez votre avenir avec de bonnes décisions. Tawjeeh a été créé pour vous offrir toutes les informations dont vous auriez besoin pour décider judicieusement "
            />
        </Splash_Container>
        
    )
    
}
export default splash
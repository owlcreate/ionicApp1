import React, { useState, useEffect } from 'react';
import { IonContent, 
         IonHeader, 
         IonPage, 
         IonTitle, 
         IonToolbar,
         IonList,
         IonItem,
         IonButtons,
         IonBackButton
         
        } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './tabs.css';
import { RouteComponentProps } from 'react-router';

interface AcademicAdvisorsPageProps extends RouteComponentProps<{
  id: string,
  instructor: string,
  
  
}> {}

const AcademicAdvisors: React.FC<AcademicAdvisorsPageProps> = ({match}) => {

  //define the state for this component
  const [advisor, setAdvisor] = useState<any>({});

  useEffect(() => {

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    url = `https://nsccapi-w0275252-apim.azure-api.net/nscccoursemap-api-w0275252/diplomaprogram/${match.params.id}`

    fetch(proxyUrl + url)
      .then(response => response.json())
      .then(json => {
        //setState of our rockets
        setAdvisor(json)
      })
  }, [])


return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/diplomaprograms"/>
          </IonButtons>
          <IonTitle>Advisors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
       
        {
            advisor.Advisors ? advisor.Advisors.map((a: any, index: any) => {
              return (
                  <IonItem
                  
                    detail={true}
                    key={index}>
                    {a.Instructor}
                    
                  </IonItem>
              )
            }) : ''
          }
        
    </IonList>
        
   
      </IonContent>
    </IonPage>
  );
};

export default AcademicAdvisors;
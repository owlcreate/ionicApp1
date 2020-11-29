import React, { useState, useEffect } from 'react';
import { IonContent, 
         IonHeader, 
         IonPage, 
         IonTitle, 
         IonToolbar,
         IonList,
         IonLabel,
         IonItem,
         IonButtons,
         IonBackButton,
    
        } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './tabs.css';
import { RouteComponentProps } from 'react-router';

interface CourseDetailPageProps extends RouteComponentProps<{
  id: string;
}> {}

const CourseDetails: React.FC<CourseDetailPageProps> = ({match}) => {

  //define the state for this component
  const [courseDetail, setCourseDetail] = useState<any>({});

  useEffect(() => {

    console.log(`Getting course detail for id ${match.params.id}`)
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    url = `https://nsccapi-w0275252-apim.azure-api.net/nscccoursemap-api-w0275252/course/${match.params.id}`

    fetch(proxyUrl + url)
      .then(response => response.json())
      .then(json => {
        //setState of our rockets
        setCourseDetail(json)
      })
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/courses"/>
          </IonButtons>
          <IonTitle>{courseDetail.Title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
      <IonItem>
        <IonLabel>Course Code</IonLabel>
       {courseDetail.CourseCode}
       
      </IonItem>
      <IonList>
      {
            courseDetail.CoursePrerequisite ? courseDetail.CoursePrerequisite.map((prerequisite: any, index: any) => {
              return (
                  <IonItem
                    detail={true}
                    key={index}>

                    {prerequisite.Title}
                  </IonItem>
              )
            }) : ''
          }
        
      </IonList>
      
        
   
      <IonItem>
        <IonLabel>Is Prerequisite For</IonLabel>
      </IonItem>
    </IonList>
        
   
      </IonContent>
    </IonPage>
  );
};

export default CourseDetails;

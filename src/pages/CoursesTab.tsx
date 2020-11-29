import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonSearchbar, IonRefresherContent, IonRefresher, IonButtons, IonBackButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { RefresherEventDetail } from '@ionic/core';
import './tabs.css';
import Course from '../models/Course';


const CoursesTab: React.FC = () => {


  //define the state for this component
  const [courses, setCourses] = useState<Array<Course>>([]);

  const [searchText, setSearchText] = useState("")



  const getData = (callback: (data: any) => void) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    url = 'https://nsccapi-w0275252-apim.azure-api.net/nscccoursemap-api-w0275252/courses'

    //retrieve data from the api 
    fetch(proxyUrl + url)
    .then(response => response.json())
    .then(json => {
      callback(json)
    })

  }

    useEffect(() => {
      getData(data => {
        setCourses(data)
      })
    }, [])
   
  
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {

      getData(data => {
        setCourses(data)
        event.detail.complete() 
      })
    }
  
    const handleInput = (event: any) => {
      setSearchText(event.target.value!)
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/"/>
          </IonButtons>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar slot="fixed">
          <IonSearchbar onIonChange={handleInput} ></IonSearchbar>
      </IonToolbar>
      <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon="arrow-dropdown"
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing...">       
          </IonRefresherContent>
        </IonRefresher>
        <IonList>
        {
            courses
            .filter((course: any) => {
              if(course.length === 0 ) {
                return "nothing found"
              }else {
                return searchText === "" || course.Title.toLowerCase().includes(searchText.toLowerCase())
              }
            })
            .map((course: any, index: number) => {
              return (
                  <IonItem 
                    href={`/courses/${course.Id}`}
                    key={index}>
                    {course.Title}              
                  </IonItem>
              )
            })
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CoursesTab;

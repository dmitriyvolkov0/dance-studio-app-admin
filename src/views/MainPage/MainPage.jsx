import React from 'react';
import Container from '@components/Container/Container';
import Menu from './Menu/Menu';
import EngineeringWorks from './EngineeringWorks/EngineeringWorks';

export default function MainPage({appData}) {
  return (
    <div>
      {/* <Container className="h-screen flex items-center -mt-[100px]"> */}
      <Container className="flex flex-col gap-4 pt-[20px]">
        <Menu/>
        <EngineeringWorks appData={appData}/>
      </Container>
    </div>
  )
}

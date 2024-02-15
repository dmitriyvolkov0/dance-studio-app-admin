import * as React from 'react';
import TopNav from './TopNav/TopNav';
import BottomNav from './BottomNav/BottomNav';

export default function Nav({navTitle, backArrow}) {

  return (
    <>
      <TopNav navTitle={navTitle} backArrow={backArrow}/>
      <BottomNav/>
    </>
  );
}
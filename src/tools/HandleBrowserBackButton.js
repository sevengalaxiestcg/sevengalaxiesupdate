import React, { useEffect, useState } from 'react'

function HandleBrowserBackButton() {
  const [isBackButtonClicked, setBackbuttonPress] = useState(false)

  useEffect(() => {

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);

    // //logic for showing popup warning on page refresh
    // window.onbeforeunload = function () {
    //   console.log('teste');
    //   return "A partida será perdida deseja atualizar?";
    // };
    return () => {
      console.log('teste2');
      window.removeEventListener('popstate', onBackButtonEvent);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if ((!isBackButtonClicked) && (window.location.hash === '#')) {
      console.log('teste3');
      // if (window.location.hash === '#modal') {
      //   console.log("fechando o modal");
      //   window.history.pushState(null, null, window.location.pathname);
      //   setBackbuttonPress(false)
      // } else {
      if (window.confirm("Abandonar Partida?")) {
        console.log('teste4');
        setBackbuttonPress(true)
        // e.history.go(listingpage)
      } else {
        console.log('test5');
        window.history.pushState(null, null, window.location.pathname);
        setBackbuttonPress(false)
      }

    }
  }

  return (
    <div>

    </div>
  )
}

export default HandleBrowserBackButton;
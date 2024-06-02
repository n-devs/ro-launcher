import React from 'react';
import './button-install.css';
import { useReactPWAInstall } from './components/pwa-install';

function App() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const [url, setUrl] = React.useState<string>("")

  const handleClick = () => {
    pwaInstall({
      title: "Install RO Saga Launcher",
      logo: "favicon.ico",
      features: (
        <ul>
          <li>เพื่อเป็นทางเข้าในรูปแบบ Application โดยไม่ต้องเข้าผ่านเว็บไซต์</li>
          <li>Offline Mode</li>
          <li>Suport Window, MacOS, ChromeOS, Android, IOS</li>
        </ul>
      ),
      description: "Ragnarok Saga เป็นเกม MMORPG Online ยดนิยมสามารถเล่นได้ทุกแพลตฟอร์ม",
    })
      .then(() => {
        console.log("App installed successfully or the install instruction was shown");
      })
      .catch(() => {
        console.log("App not installed, user opted out.");

      });
  };
  React.useEffect(() => {
    if (isInstalled()) {
      fetch("https://raw.githubusercontent.com/n-devs/public-ip/data/ip-address.json").then(res => res.json())
        .then(data => {
          setUrl(`https://${data.ipv4}:8000`)
        })
    }
  }, [])

  return (
    <>
      {!isInstalled() ? (
        <div id="box-install" style={{
          position: 'fixed',
          zIndex: 10000,
          bottom: '10vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>

          <button className="button-install" style={{
            display: 'block',
            fontSize: 'xxx-large',
            fontWeight: 'bold',
          }} onClick={handleClick}>
            Install
          </button>
        </div>
      ) : (<>
        {url && (<iframe src={url} width="100%" height="100%" style={{ border: "none" }} allowFullScreen={true}></iframe>)}

      </>)}
    </>
  );
}

export default App;

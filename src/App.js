import React from 'react';
import './App.css';
import UserPage from './Components/HomeScreen';
import PermissionsScreen from './Components/Permission';
import VerticalProgressBar from './Components/Progressbar';
import CredentialProgressBar from './Components/Progressbar';
import CredentialProgressBarSvg from './Components/Progressbar';


// Placeholder image URLs (you can replace these with actual image URLs or local assets)
const logoUrl = 'https://via.placeholder.com/150x50.png?text=Aarvi+Bakery+Logo';
const cakeImage = 'https://via.placeholder.com/300x200.png?text=Cake+Image';
const iceCreamImage = 'https://via.placeholder.com/300x200.png?text=Ice+Cream+Image';
const puffImage = 'https://via.placeholder.com/300x200.png?text=Puff+Image';

function App() {
  // const cakes = [

  //   'Cool Cakes',
  //   'Normal Cakes',
  //   'Red Velvet',
  //   'White Forest',
  //   'Black Forest'
  // ];

  // const iceCreams = [
  //   'Vanilla',
  //   'Chocolate',
  //   'Strawberry',
  //   'Mango',
  //   'Butterscotch'
  // ];

  // const puffs = [
  //   'Veg Puff',
  //   'Egg Puff',
  //   'Chicken Puff',
  //   'Paneer Puff',
  //   'Mushroom Puff'
  // ];

  // return (
  //   <div className="App">
  //     <header className="header">
  //       <div className="header-content">
  //         <img src={logoUrl} alt="Aarvi Bakery Logo" className="logo" />
  //         <div>
  //           <h1>Welcome to Aarvi Bakery</h1>
  //           <p>Your one-stop shop for delicious treats!</p>
  //         </div>
  //       </div>
  //     </header>

  //     <main>
  //       <section className="menu-section">
  //         <h2>Our Cakes</h2>
  //         <div className="section-content">
  //           <img src={cakeImage} alt="Delicious Cakes" className="section-image" />
  //           <ul className="item-list">
  //             {cakes.map((cake, index) => (
  //               <li key={index}>{cake}</li>
  //             ))}
  //           </ul>
  //         </div>
  //       </section>

  //       <section className="menu-section">
  //         <h2>Ice Creams</h2>
  //         <div className="section-content">
  //           <img src={iceCreamImage} alt="Tasty Ice Creams" className="section-image" />
  //           <ul className="item-list">
  //             {iceCreams.map((iceCream, index) => (
  //               <li key={index}>{iceCream}</li>
  //             ))}
  //           </ul>
  //         </div>
  //       </section>

  //       <section className="menu-section">
  //         <h2>Puffs</h2>
  //         <div className="section-content">
  //           <img src={puffImage} alt="Savory Puffs" className="section-image" />
  //           <ul className="item-list">
  //             {puffs.map((puff, index) => (
  //               <li key={index}>{puff}</li>
  //             ))}
  //           </ul>
  //         </div>
  //       </section>
  //     </main>

  //     <footer>
  //       <p>Visit us at Aarvi Bakery or order online!</p>
  //       <p>Contact: +1-555-0123 | info@aarvibakery.com</p>
  //     </footer>
  //   </div>
  // );
return(
  // <UserPage/>
  // <PermissionsScreen/>
  <CredentialProgressBarSvg/>
)
}


export default App;
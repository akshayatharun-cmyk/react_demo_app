import { useState , useRef} from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

export default function App() 
{
  return (
    <>
      <Stop_watch />
      <Weather_app />
      <Shopping_cart />
      <DogInfo />
      <AutoFocusSearch />
    </>
  )
}


function Stop_watch() 
{
    const [state,setState] = useState("reset") ;
    const [display,setDisplay] = useState("00:00:00") ;
    
    
    if(state === "reset" && display !== "00:00:00") setDisplay("00:00:00") ;
    
    if(state === "running")
    {
        setTimeout(() => {
                const dis1 = display ; 
                let time = dis1.split(":");
                let hours = parseInt(time[0]);
                let minutes = parseInt(time[1]);
                let seconds = parseInt(time[2]);
            seconds++;
            if(seconds === 60){
                seconds = 0;
                minutes++;
            }
            if(minutes === 60){
                minutes = 0;
                hours++;
            }
            
            setDisplay(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
          },1000) ; 
    }
      
              
    return (
         <div className="stop_watch">
            <h1>Stop Watch</h1>
            {}
            <p>{display}</p>
            <div>
              <button onClick={() => setState("running") }>Start</button>
              <button onClick={() => setState("reset")}>Reset</button>
              <button onClick={() => setState("paused")}>pause</button>
            </div>
        </div>
    )
}

function Weather_app() {
  const [temperature, setTemperature] = useState(0);

  async function fetchtemp() {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=4.38&lon=10.99&appid=959de4890a9394726316d0ae15d6d838"
    );

    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    return data.main.temp;
  }

  useEffect(() => {
    
    fetchtemp().then((temp) => setTemperature(temp));
  }, []);

  return (
    <div className="weather_app">
        <h1>Weather</h1>
        <p>Temperature: {temperature}°K</p>
    </div>
  );
}

function Shopping_cart() 
{
  const [cart, setCart] = useState([]);
  const [item, setItem] = useState("");

  function addToCart(item) 
  {
     setCart([...cart, item]) ; 
  }

  function removeFromCart(item)
  {
     setCart(cart.filter(i => i !== item)) ; 
  }

  return (
    <div className="shopping_cart">
        <h1>Shopping Cart</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={() => {addToCart(item) ; setItem("") ;}}>Add to Cart</button>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );

}

function DogInfo()
{
     const [page,setPage] = useState(5) ;
   async function fetchinfo() 
   {
       const response = await fetch(`https://dogapi.dog/api/v2/breeds?page%5Bnumber%5D=${page}&page%5Bsize%5D=7`) ; 
        if(!response.ok) throw new Error("Failed to fetch dog info") ;
        const data = await response.json() ;
        return data.data ;
   }

    const [dogInfo,setDogInfo] = useState([]) ;
    useEffect(() => {
        fetchinfo().then((info) => setDogInfo(info)) ;
    },[page]) ;

    
    return (
  <div className="dog_info">
    <h1>Dog Info</h1>

    <div className="dog_container">
      {dogInfo.map((dog) => (
        <div className="dog_card" key={dog.id}>
          <h2>{dog.attributes.name}</h2>
          <p>{dog.attributes.description}</p>
        </div>
      ))}
    </div>
    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
      Previous
    </button>
    <button onClick={() => setPage(page + 1)} disabled={dogInfo.length < 7}>
      Next
    </button>
  </div>
);
}

 function AutoFocusSearch() {
  const [query, setQuery] = useState('');
  
  // 1. Create a ref to store the input DOM element
  const inputRef = useRef(null);

  // 2. Focus the input immediately when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []); // Empty dependency array ensures this runs only once

  const handleClear = () => {
    setQuery('');
    // 3. Keep focus on the input after clearing the text
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h3 style={{color: 'black'}}>Search Widget</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          ref={inputRef} // 4. Attach the ref to the DOM node
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
          style={{ padding: '8px', flex: 1 }}
        />
        <button onClick={handleClear} style={{ padding: '8px' }}>
          Clear
        </button>
      </div>
      <p>
        Searching for: <span className="search-query">{query}</span>
      </p>
    </div>
  );
}

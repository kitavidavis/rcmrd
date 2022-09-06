import React, { memo, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Table,
  Group,
  ActionIcon,
  CloseButton,
  Grid,
  Stack,
  Box,
  Title,
  TextInput,
  NumberInput,
  Button,
  Divider,
  Select,
  Menu,
  Autocomplete,
  Chip,
  SimpleGrid,
  Switch,
} from '@mantine/core';
import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvents } from 'react-leaflet'
import wards from './assets/wards';
import { useViewportSize } from '@mantine/hooks';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
} from 'chart.js';
import { Scatter, Line, Bar } from 'react-chartjs-2';
import {
  NavigationProgress,
  incrementNavigationProgress,
  decrementNavigationProgress,
  setNavigationProgress,
  startNavigationProgress,
  stopNavigationProgress,
  resetNavigationProgress,
} from '@mantine/nprogress';
import { Video, VideoOff } from 'tabler-icons-react';
import L from "leaflet";
import "./legend.css";
const { faker } = require('@faker-js/faker');

ChartJS.register(LinearScale, PointElement, LineElement, BarElement, CategoryScale, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: false,
    },
  },
};

const labels = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];

export default function Dashboard() {
  localStorage.setItem("looping", true);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const {height, width} = useViewportSize();
  const [pop, setPop] = useState(null);
  const [subcounty, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [current, setCurrent] = useState("2013");
  const [type, setType] = useState("lst");
  const [anim, setAnimSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [pause, setPause] = useState(false);
  const [center, setCenter] = useState([-1.286389, 36.817223])
  const [zoom, setZoom] = useState(10);
  const [lock, setLocked] = useState(true);
  const [count, setCount] = useState(0);

  const [arrdata, setArrData] = useState(null);
  const [arrdata2, setArrData2] = useState(null);
  const [arrdata3, setArrData3] = useState(null);

  const [loop, setLoop] = useState(false);

  React.useEffect(() => {
    let a = localStorage.getItem("looping");
    if(a){
      setLoop(a);
    }
  }, []);

  const handleSwitch = (e) => {
    localStorage.setItem("looping", e.currentTarget.checked);
    if(e.currentTarget.checked){
      setLoop(true);
    } else {
      window.location.reload();
      //setTimeout(function(){document.getElementById("play-btn").click()}, 200)
    }
  }

  const ZoomComponent = () => {
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoom(mapEvents.getZoom());
        },
        moveend: () => {
          let el = mapEvents.getCenter();
          setCenter([el.lat, el.lng])
        },
        mouseover: (e) => {
          console.log(e.target);
        }
    });


    return null
}

React.useEffect(() => {
  let total13 = 0;
  let total14 = 0;
  let total15 = 0;
  let total16 = 0;
  let total17 = 0;
  let total18 = 0;
  let total19 = 0;
  let total20 = 0;
  let total21 = 0;


  for(let i=0; i<wards.features.length; i++){
    let item = wards.features[i].properties;
    total13 = total13 + item.LST2013;
    total14 = total14 + item.LST2014;
    total15 = total15 + item.LST2015;
    total16 = total16 + item.LST2016;
    total17 = total17 + item.LST2017;
    total18 = total18 + item.LST2018;
    total19 = total19 + item.LST2019;
    total20 = total20 + item.LST2020;
    total21 = total21 + item.LST2021;

  }

  let arr = [total13 / wards.features.length, total14 / wards.features.length, total15 / wards.features.length, total16 / wards.features.length, total17 / wards.features.length, total18 / wards.features.length, total19 / wards.features.length, total20 / wards.features.length, total21 / wards.features.length]

  setArrData3(arr);
}, []);

  const onChange = React.useCallback((arr1, arr2, yr) => {
    setArrData(arr1);
    setArrData2(arr2);
    setCurrent(yr)
  }, []);

  const handleYearChange = (val) => {
    if(val < 2013){
      return false;
    }

    if(val > 2021){
      return false;
    }

    let valStr = val.toString();
    let arrdatat = [];
    let arrdata2t = []

    switch(valStr){
      case "2013":
        wards.features.forEach((item) => {
          if(item.properties.LST2013 !== null && item.properties.NDVI2013 !== null){
      
            arrdatat.push({x: item.properties.LST2013, y: item.properties.NDVI2013})
            arrdata2t.push({x: item.properties.LST2013, y: item.properties.NDBI2013})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2013")

        break;

      case "2014":
        wards.features.forEach((item) => {
          if(item.properties.LST2014 !== null && item.properties.NDVI2014 !== null){
      
            arrdatat.push({y: item.properties.LST2014, x: item.properties.NDVI2014})
            arrdata2t.push({y: item.properties.LST2014, x: item.properties.NDBI2014})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2014")

        break;

      case "2015":
        wards.features.forEach((item) => {
          if(item.properties.LST2015 !== null && item.properties.NDVI2015 !== null){
      
            arrdatat.push({y: item.properties.LST2015, x: item.properties.NDVI2015})
            arrdata2t.push({y: item.properties.LST2015, x: item.properties.NDBI2015})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2015")

        break;

      case "2016":
        wards.features.forEach((item) => {
          if(item.properties.LST2016 !== null && item.properties.NDVI2016 !== null){
      
            arrdatat.push({y: item.properties.LST2016, x: item.properties.NDVI2016})
            arrdata2t.push({y: item.properties.LST2016, x: item.properties.NDBI2016})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2016")

        break;

      case "2017":
        wards.features.forEach((item) => {
          if(item.properties.LST2017 !== null && item.properties.NDVI2017 !== null){
      
            arrdatat.push({y: item.properties.LST2017, x: item.properties.NDVI2017})
            arrdata2t.push({y: item.properties.LST2017, x: item.properties.NDBI2017})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2017")

        break;

      case "2018":
        wards.features.forEach((item) => {
          if(item.properties.LST2018 !== null && item.properties.NDVI2018 !== null){
      
            arrdatat.push({y: item.properties.LST2018, x: item.properties.NDVI2018})
            arrdata2t.push({y: item.properties.LST2018, x: item.properties.NDBI2018})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2018")

        break;

      case "2019":
        wards.features.forEach((item) => {
          if(item.properties.LST2019 !== null && item.properties.NDVI2019 !== null){
      
            arrdatat.push({y: item.properties.LST2019, x: item.properties.NDVI2019})
            arrdata2t.push({y: item.properties.LST2019, x: item.properties.NDBI2019})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2019")

        break;

      case "2020":
        wards.features.forEach((item) => {
          if(item.properties.LST2020 !== null && item.properties.NDVI2020 !== null){
      
            arrdatat.push({y: item.properties.LST2020, x: item.properties.NDVI2020})
            arrdata2t.push({y: item.properties.LST2020, x: item.properties.NDBI2020})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2020")

        break;

      case "2021":
        wards.features.forEach((item) => {
          if(item.properties.LST2021 !== null && item.properties.NDVI2021 !== null){
      
            arrdatat.push({y: item.properties.LST2021, x: item.properties.NDVI2021})
            arrdata2t.push({y: item.properties.LST2021, x: item.properties.NDBI2021})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2013")

        break;

      default:
        // do nothing.
    }


  }

 const handle2013 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2013 !== null && item.properties.NDVI2013 !== null){

      arrdatat.push({y: item.properties.LST2013, x: item.properties.NDVI2013})
      arrdata2t.push({y: item.properties.LST2013, x: item.properties.NDBI2013})
    } 
  });

  onChange(arrdatat, arrdata2t, "2013")
  
  if (!pause && playing) {
    setTimeout(function(){handle2014()}, (anim * 1000));
  }
 }

 const handle2014 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2014 !== null && item.properties.NDVI2014 !== null){

      arrdatat.push({y: item.properties.LST2014, x: item.properties.NDVI2014})
      arrdata2t.push({y: item.properties.LST2014, x: item.properties.NDBI2014})
    } 
  });

  onChange(arrdatat, arrdata2t, "2014")
  incrementNavigationProgress(10);
  if(!pause){
    setTimeout(function(){handle2015()}, (anim * 1000));
  }
 }

 const handle2015 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2015 !== null && item.properties.NDVI2015 !== null){

      arrdatat.push({y: item.properties.LST2015, x: item.properties.NDVI2015})
      arrdata2t.push({y: item.properties.LST2015, x: item.properties.NDBI2015})
    } 
  });

  onChange(arrdatat, arrdata2t, "2015")
if(!pause){
  setTimeout(function(){handle2016()}, (anim * 1000));
}
  incrementNavigationProgress(10);
 }

 const handle2016 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2016 !== null && item.properties.NDVI2016 !== null){

      arrdatat.push({y: item.properties.LST2016, x: item.properties.NDVI2016})
      arrdata2t.push({y: item.properties.LST2016, x: item.properties.NDBI2016})
    } 
  });

  onChange(arrdatat, arrdata2t, "2016")
  if(!pause){
    setTimeout(function(){handle2017()}, (anim * 1000));
  }
  incrementNavigationProgress(10);
 }

 const handle2017 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2017 !== null && item.properties.NDVI2017 !== null){

      arrdatat.push({y: item.properties.LST2017, x: item.properties.NDVI2017})
      arrdata2t.push({y: item.properties.LST2017, x: item.properties.NDBI2017})
    } 
  });

  onChange(arrdatat, arrdata2t, "2017")
  if(!pause){
    setTimeout(function(){handle2018()}, (anim * 1000));
  }
  incrementNavigationProgress(10);
 }

 const handle2018 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2018 !== null && item.properties.NDVI2018 !== null){

      arrdatat.push({y: item.properties.LST2018, x: item.properties.NDVI2018})
      arrdata2t.push({y: item.properties.LST2018, x: item.properties.NDBI2018})
    } 
  });

  onChange(arrdatat, arrdata2t, "2018")
  if(!pause){
    setTimeout(function(){handle2019()}, (anim * 1000));
  }
  incrementNavigationProgress(10);
 }

const handle2019 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2019 !== null && item.properties.NDVI2019 !== null){

      arrdatat.push({y: item.properties.LST2019, x: item.properties.NDVI2019})
      arrdata2t.push({y: item.properties.LST2019, x: item.properties.NDBI2019})
    } 
  });

  onChange(arrdatat, arrdata2t, "2019")
  if(!pause){
    setTimeout(function(){handle2020()}, (anim * 1000));
  }
  incrementNavigationProgress(10);
}

const handle2020 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2020 !== null && item.properties.NDVI2020 !== null){

      arrdatat.push({y: item.properties.LST2020, x: item.properties.NDVI2020})
      arrdata2t.push({y: item.properties.LST2020, x: item.properties.NDBI2020})
    } 
  });

  onChange(arrdatat, arrdata2t, "2020")
 if(!pause){
  setTimeout(function(){handle2021()}, (anim * 1000));
 }
  incrementNavigationProgress(10);
}

const handle2021 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2021 !== null && item.properties.NDVI2021 !== null){

      arrdatat.push({y: item.properties.LST2021, x: item.properties.NDVI2021})
      arrdata2t.push({y: item.properties.LST2021, x: item.properties.NDBI2021})
    } 
  });

  onChange(arrdatat, arrdata2t, "2021")
  if(!pause){
    setTimeout(function(){handle2013()}, (anim * 1000));
  }
  incrementNavigationProgress(20);
}

React.useEffect(() => {
  handle2013();
}, []);

  const data = {
    datasets: [
      {
        label: 'LST against NDVI',
        showLine: true,
        data: arrdata,
        backgroundColor: 'green',
      },
    ],
  };
  
  const data2 = {
    datasets: [
      {
        label: 'LST against NDBI',
        data: arrdata2,
        backgroundColor: 'yellow',
      },
    ],
  };

  const data3 = {
    labels,
    datasets: [
      {
        label: 'Mean LST',
        data: arrdata3,
        backgroundColor: '#FF4500',
      },
    ],
  };

  const delay = () => {
    return new Promise(resolve => {
      setTimeout(resolve, (anim * 1000));
    });
  }

  const playAnimation = () => {
    setPlaying(true);
    setCount(count => count + 1);
    incrementNavigationProgress(10);
    setTimeout(function(){handle2014()}, (anim * 1000));
  };

  const onStyleLSTColor = (n) => {
    if(n <= 28){
      return "#ffffb2"
  } else if(n <= 31) {
      return "#fecc5c"
  } else if(n <= 34) {
      return "#fd8d3c"
  } else if(n <= 37){
      return "#f03b20"
  } else {
      return "#bd0026"
  }

  };

  const LSTLegend = () => {
    const map = useMap();

    const getColor = d => {
      return d > 37
        ? "#bd0026"
        : d > 34
        ? "#f03b20"
        : d > 31
        ? "#fd8d3c"
        : d > 28
        ? "#fecc5c"
        : "#ffffb2";
    };

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 28, 31, 34, 37];
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<span style="background:' +
            getColor(from + 1) +
            '"></span> ' +
            from +
            (to ? "&ndash;" + to : "+")
        );
      }

      div.innerHTML = labels.join("<br>");          return div;
    };

    //legend.addTo(map);
    // there is a bug here

    return null;
  }

  const onStyleNDVIColor = React.useCallback((n) => {
    if(n <= 0.2){
      return "#ffffcc"
  } else if(n <= 0.4) {
      return "#c2e699"
  } else if(n <= 0.6) {
      return "#78c679"
  } else if(n <= 0.8){
      return "#31a354"
  } else {
      return "#006837"
  }
  }, []);

  const onStyleNDBIColor = React.useCallback((p ) => {
    let n = p * 10;
    if(n <= 0){
      return "#fee5d9"
  } else if(n <= 0.2) {
      return "#fcae91"
  } else if(n <= 0.4) {
      return "#fb6a4a"
  } else if(n <= 0.6){
      return "#de2d26"
  } else {
      return "#a50f15"
  }
  }, [])

  const onStyleLSTMean = (feature) => {
    switch(current){
      case "2013":
        if(feature.properties.LST2013 > arrdata3[0]){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2014":
        if(feature.properties.LST2014 > arrdata3[1]){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2015":
        if(feature.properties.LST2015 > arrdata3[2]){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2016":
        if(feature.properties.LST2016 > arrdata3[3]){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2017":
        if(feature.properties.LST2017 > arrdata3[4]){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2018":
        if(feature.properties.LST2018 > arrdata3[5]){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2019":
        if(feature.properties.LST2019 > arrdata3[6]){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2020":
        if(feature.properties.LST2020 > arrdata3[7]){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2021":
        if(feature.properties.LST2021 > arrdata3[8]){
          return "#D9480F"
        } else {
          return "gray";
        }

      default:
        //do nothing.
    }
  }

  const retrieveLST = (f, yr) => {
    let c = yr || current;
    switch(c){
      case "2013":
        return f.properties.LST2013.toFixed(2);

      case "2014":
        return f.properties.LST2014.toFixed(2);

      case "2015":
        return f.properties.LST2015.toFixed(2);

      case "2016":
        return f.properties.LST2016.toFixed(2);

      case "2017":
        return f.properties.LST2017.toFixed(2);

      case "2018":
        return f.properties.LST2018.toFixed(2);

      case "2019":
        return f.properties.LST2019.toFixed(2);

      case "2020":
        return f.properties.LST2020.toFixed(2);

      default:
        return f.properties.LST2021.toFixed(2);
    }
  }

  const retrieveNDVI = (f, yr) => {
    let c = yr || current;

    switch(c){
      case "2013":
        return f.properties.NDVI2013.toFixed(2);

      case "2014":
        return f.properties.NDVI2014.toFixed(2);

      case "2015":
        return f.properties.NDVI2015.toFixed(2);

      case "2016":
        return f.properties.NDVI2016.toFixed(2);

      case "2017":
        return f.properties.NDVI2017.toFixed(2);

      case "2018":
        return f.properties.NDVI2018.toFixed(2);

      case "2019":
        return f.properties.NDVI2019.toFixed(2);

      case "2020":
        return f.properties.NDVI2020.toFixed(2);

      default:
        return f.properties.NDVI2021.toFixed(2);
    }
  }

  const retrieveNDBI = (f, yr) => {
    let c = yr || current;
    switch(c){
      case "2013":
        return f.properties.NDBI2013.toFixed(2);

      case "2014":
        return f.properties.NDBI2014.toFixed(2);

      case "2015":
        return f.properties.NDBI2015.toFixed(2);

      case "2016":
        return f.properties.NDBI2016.toFixed(2);

      case "2017":
        return f.properties.NDBI2017.toFixed(2);

      case "2018":
        return f.properties.NDBI2018.toFixed(2);

      case "2019":
        return f.properties.NDBI2019.toFixed(2);

      case "2020":
        return f.properties.NDBI2020.toFixed(2);

      default:
        return f.properties.NDBI2021.toFixed(2);
    }
  }
const MapMean = () => {
    return (
      <MapContainer style={{height: '100%', width: '100%', backgroundColor: '#101113'}}  center={[-1.286389, 36.817223]} zoom={10} scrollWheelZoom={false}>

                    <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleLSTMean(feature)
                }
              }} onEachFeature={(f, l) => {
                l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
              }}   />
      </MapContainer>
    )
}

  const MapPanel = () => {
    return (
        <MapContainer style={{height: '100%', width: '100%', backgroundColor: '#101113'}}  center={lock ? [-1.286389, 36.817223] : center} zoom={lock ? 10 : zoom} scrollWheelZoom={false}>

{!lock ? <ZoomComponent /> : null}
<LSTLegend />
      {current === "2013" ? (
              <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleLSTColor(feature.properties.LST2013)
                }
              }} onEachFeature={(f, l) => {
                l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
                if(!lock){
                  l.addEventListener('dblclick', function(e){
                    let el = e.target._latlngs[0][0][0];
                    setCenter([el.lat, el.lng]);
                    setZoom(13);
                  
                  })
                }
              }}   />
      ) : current === "2014" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor:  onStyleLSTColor(feature.properties.LST2014)
          }
        }}  onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2015" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleLSTColor(feature.properties.LST2015)
          }
        }}  onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2016" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleLSTColor(feature.properties.LST2016)
          }
        }}  onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2017" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor:  onStyleLSTColor(feature.properties.LST2017)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}   />
      ) : current === "2018" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleLSTColor(feature.properties.LST2018)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}   />
      ) : current === "2019" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleLSTColor(feature.properties.LST2019)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2020" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleLSTColor(feature.properties.LST2020)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor:  onStyleLSTColor(feature.properties.LST2021)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>LST2013</strong></td><td>"+retrieveLST(f, "2013")+"</td></tr><tr><td><strong>LST2014</strong></td><td>"+retrieveLST(f, "2014")+"</td></tr><tr><td><strong>LST2015</strong></td><td>"+retrieveLST(f, "2015")+"</td></tr><tr><td><strong>LST2016</strong></td><td>"+retrieveLST(f, "2016")+"</td></tr><tr><td><strong>LST2017</strong></td><td>"+retrieveLST(f, "2017")+"</td></tr><tr><td><strong>LST2018</strong></td><td>"+retrieveLST(f, "2018")+"</td></tr><tr><td><strong>LST2019</strong></td><td>"+retrieveLST(f, "2019")+"</td></tr><tr><td><strong>LST2020</strong></td><td>"+retrieveLST(f, "2020")+"</td></tr><tr><td><strong>LST2021</strong></td><td>"+retrieveLST(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      )}
      </MapContainer>
    )
  }

  const NDVIMap = () => {
    return (
        <MapContainer style={{height: '100%', width: '100%', backgroundColor: '#101113'}}  center={lock ? [-1.286389, 36.817223] : center} zoom={lock ? 10 : zoom} scrollWheelZoom={false}>
{!lock ? <ZoomComponent /> : null}
      {current === "2013" ? (
              <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleNDVIColor(feature.properties.NDVI2013)
                }
              }} onEachFeature={(f, l) => {
                l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDVI2013</strong></td><td>"+retrieveNDVI(f, "2013")+"</td></tr><tr><td><strong>NDVI2014</strong></td><td>"+retrieveNDVI(f, "2014")+"</td></tr><tr><td><strong>NDVI2015</strong></td><td>"+retrieveNDVI(f, "2015")+"</td></tr><tr><td><strong>NDVI2016</strong></td><td>"+retrieveNDVI(f, "2016")+"</td></tr><tr><td><strong>NDVI2017</strong></td><td>"+retrieveNDVI(f, "2017")+"</td></tr><tr><td><strong>NDVI2018</strong></td><td>"+retrieveNDVI(f, "2018")+"</td></tr><tr><td><strong>NDVI2019</strong></td><td>"+retrieveNDVI(f, "2019")+"</td></tr><tr><td><strong>NDVI2020</strong></td><td>"+retrieveNDVI(f, "2020")+"</td></tr><tr><td><strong>NDVI2021</strong></td><td>"+retrieveNDVI(f, "2021")+"</td></tr></table></div>")

                if(!lock){
                  l.addEventListener('dblclick', function(e){
                    let el = e.target._latlngs[0][0][0];
                    setCenter([el.lat, el.lng]);
                    setZoom(13);
                  })
                }
              }}   />
      ) : current === "2014" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2014)          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDVI2013</strong></td><td>"+retrieveNDVI(f, "2013")+"</td></tr><tr><td><strong>NDVI2014</strong></td><td>"+retrieveNDVI(f, "2014")+"</td></tr><tr><td><strong>NDVI2015</strong></td><td>"+retrieveNDVI(f, "2015")+"</td></tr><tr><td><strong>NDVI2016</strong></td><td>"+retrieveNDVI(f, "2016")+"</td></tr><tr><td><strong>NDVI2017</strong></td><td>"+retrieveNDVI(f, "2017")+"</td></tr><tr><td><strong>NDVI2018</strong></td><td>"+retrieveNDVI(f, "2018")+"</td></tr><tr><td><strong>NDVI2019</strong></td><td>"+retrieveNDVI(f, "2019")+"</td></tr><tr><td><strong>NDVI2020</strong></td><td>"+retrieveNDVI(f, "2020")+"</td></tr><tr><td><strong>NDVI2021</strong></td><td>"+retrieveNDVI(f, "2021")+"</td></tr></table></div>")

          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2015" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2015)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDVI2013</strong></td><td>"+retrieveNDVI(f, "2013")+"</td></tr><tr><td><strong>NDVI2014</strong></td><td>"+retrieveNDVI(f, "2014")+"</td></tr><tr><td><strong>NDVI2015</strong></td><td>"+retrieveNDVI(f, "2015")+"</td></tr><tr><td><strong>NDVI2016</strong></td><td>"+retrieveNDVI(f, "2016")+"</td></tr><tr><td><strong>NDVI2017</strong></td><td>"+retrieveNDVI(f, "2017")+"</td></tr><tr><td><strong>NDVI2018</strong></td><td>"+retrieveNDVI(f, "2018")+"</td></tr><tr><td><strong>NDVI2019</strong></td><td>"+retrieveNDVI(f, "2019")+"</td></tr><tr><td><strong>NDVI2020</strong></td><td>"+retrieveNDVI(f, "2020")+"</td></tr><tr><td><strong>NDVI2021</strong></td><td>"+retrieveNDVI(f, "2021")+"</td></tr></table></div>")

          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}   />
      ) : current === "2016" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2016)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDVI2013</strong></td><td>"+retrieveNDVI(f, "2013")+"</td></tr><tr><td><strong>NDVI2014</strong></td><td>"+retrieveNDVI(f, "2014")+"</td></tr><tr><td><strong>NDVI2015</strong></td><td>"+retrieveNDVI(f, "2015")+"</td></tr><tr><td><strong>NDVI2016</strong></td><td>"+retrieveNDVI(f, "2016")+"</td></tr><tr><td><strong>NDVI2017</strong></td><td>"+retrieveNDVI(f, "2017")+"</td></tr><tr><td><strong>NDVI2018</strong></td><td>"+retrieveNDVI(f, "2018")+"</td></tr><tr><td><strong>NDVI2019</strong></td><td>"+retrieveNDVI(f, "2019")+"</td></tr><tr><td><strong>NDVI2020</strong></td><td>"+retrieveNDVI(f, "2020")+"</td></tr><tr><td><strong>NDVI2021</strong></td><td>"+retrieveNDVI(f, "2021")+"</td></tr></table></div>")

          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}   />
      ) : current === "2017" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2017)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDVI2013</strong></td><td>"+retrieveNDVI(f, "2013")+"</td></tr><tr><td><strong>NDVI2014</strong></td><td>"+retrieveNDVI(f, "2014")+"</td></tr><tr><td><strong>NDVI2015</strong></td><td>"+retrieveNDVI(f, "2015")+"</td></tr><tr><td><strong>NDVI2016</strong></td><td>"+retrieveNDVI(f, "2016")+"</td></tr><tr><td><strong>NDVI2017</strong></td><td>"+retrieveNDVI(f, "2017")+"</td></tr><tr><td><strong>NDVI2018</strong></td><td>"+retrieveNDVI(f, "2018")+"</td></tr><tr><td><strong>NDVI2019</strong></td><td>"+retrieveNDVI(f, "2019")+"</td></tr><tr><td><strong>NDVI2020</strong></td><td>"+retrieveNDVI(f, "2020")+"</td></tr><tr><td><strong>NDVI2021</strong></td><td>"+retrieveNDVI(f, "2021")+"</td></tr></table></div>")

          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2018" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2018)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDVI2013</strong></td><td>"+retrieveNDVI(f, "2013")+"</td></tr><tr><td><strong>NDVI2014</strong></td><td>"+retrieveNDVI(f, "2014")+"</td></tr><tr><td><strong>NDVI2015</strong></td><td>"+retrieveNDVI(f, "2015")+"</td></tr><tr><td><strong>NDVI2016</strong></td><td>"+retrieveNDVI(f, "2016")+"</td></tr><tr><td><strong>NDVI2017</strong></td><td>"+retrieveNDVI(f, "2017")+"</td></tr><tr><td><strong>NDVI2018</strong></td><td>"+retrieveNDVI(f, "2018")+"</td></tr><tr><td><strong>NDVI2019</strong></td><td>"+retrieveNDVI(f, "2019")+"</td></tr><tr><td><strong>NDVI2020</strong></td><td>"+retrieveNDVI(f, "2020")+"</td></tr><tr><td><strong>NDVI2021</strong></td><td>"+retrieveNDVI(f, "2021")+"</td></tr></table></div>")

          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2019" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2019)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDVI2013</strong></td><td>"+retrieveNDVI(f, "2013")+"</td></tr><tr><td><strong>NDVI2014</strong></td><td>"+retrieveNDVI(f, "2014")+"</td></tr><tr><td><strong>NDVI2015</strong></td><td>"+retrieveNDVI(f, "2015")+"</td></tr><tr><td><strong>NDVI2016</strong></td><td>"+retrieveNDVI(f, "2016")+"</td></tr><tr><td><strong>NDVI2017</strong></td><td>"+retrieveNDVI(f, "2017")+"</td></tr><tr><td><strong>NDVI2018</strong></td><td>"+retrieveNDVI(f, "2018")+"</td></tr><tr><td><strong>NDVI2019</strong></td><td>"+retrieveNDVI(f, "2019")+"</td></tr><tr><td><strong>NDVI2020</strong></td><td>"+retrieveNDVI(f, "2020")+"</td></tr><tr><td><strong>NDVI2021</strong></td><td>"+retrieveNDVI(f, "2021")+"</td></tr></table></div>")

          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2020" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2020)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDVI2013</strong></td><td>"+retrieveNDVI(f, "2013")+"</td></tr><tr><td><strong>NDVI2014</strong></td><td>"+retrieveNDVI(f, "2014")+"</td></tr><tr><td><strong>NDVI2015</strong></td><td>"+retrieveNDVI(f, "2015")+"</td></tr><tr><td><strong>NDVI2016</strong></td><td>"+retrieveNDVI(f, "2016")+"</td></tr><tr><td><strong>NDVI2017</strong></td><td>"+retrieveNDVI(f, "2017")+"</td></tr><tr><td><strong>NDVI2018</strong></td><td>"+retrieveNDVI(f, "2018")+"</td></tr><tr><td><strong>NDVI2019</strong></td><td>"+retrieveNDVI(f, "2019")+"</td></tr><tr><td><strong>NDVI2020</strong></td><td>"+retrieveNDVI(f, "2020")+"</td></tr><tr><td><strong>NDVI2021</strong></td><td>"+retrieveNDVI(f, "2021")+"</td></tr></table></div>")

          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2021)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDVI2013</strong></td><td>"+retrieveNDVI(f, "2013")+"</td></tr><tr><td><strong>NDVI2014</strong></td><td>"+retrieveNDVI(f, "2014")+"</td></tr><tr><td><strong>NDVI2015</strong></td><td>"+retrieveNDVI(f, "2015")+"</td></tr><tr><td><strong>NDVI2016</strong></td><td>"+retrieveNDVI(f, "2016")+"</td></tr><tr><td><strong>NDVI2017</strong></td><td>"+retrieveNDVI(f, "2017")+"</td></tr><tr><td><strong>NDVI2018</strong></td><td>"+retrieveNDVI(f, "2018")+"</td></tr><tr><td><strong>NDVI2019</strong></td><td>"+retrieveNDVI(f, "2019")+"</td></tr><tr><td><strong>NDVI2020</strong></td><td>"+retrieveNDVI(f, "2020")+"</td></tr><tr><td><strong>NDVI2021</strong></td><td>"+retrieveNDVI(f, "2021")+"</td></tr></table></div>")

          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      )}
      </MapContainer>
    )
  }

  const NDBIMap = () => {
    return (
        <MapContainer style={{height: '100%', width: '100%', backgroundColor: '#101113'}}  center={lock ? [-1.286389, 36.817223] : center} zoom={lock ? 10 : zoom} scrollWheelZoom={true}>

{!lock ? <ZoomComponent /> : null}
      {current === "2013" ? (
              <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleNDBIColor(feature.properties.NDBI2013)
                }
              }} onEachFeature={(f, l) => {
                l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDBI2013</strong></td><td>"+retrieveNDBI(f, "2013")+"</td></tr><tr><td><strong>NDBI2014</strong></td><td>"+retrieveNDBI(f, "2014")+"</td></tr><tr><td><strong>NDBI2015</strong></td><td>"+retrieveNDBI(f, "2015")+"</td></tr><tr><td><strong>NDBI2016</strong></td><td>"+retrieveNDBI(f, "2016")+"</td></tr><tr><td><strong>NDBI2017</strong></td><td>"+retrieveNDBI(f, "2017")+"</td></tr><tr><td><strong>NDBI2018</strong></td><td>"+retrieveNDBI(f, "2018")+"</td></tr><tr><td><strong>NDBI2019</strong></td><td>"+retrieveNDBI(f, "2019")+"</td></tr><tr><td><strong>NDBI2020</strong></td><td>"+retrieveNDBI(f, "2020")+"</td></tr><tr><td><strong>NDBI2021</strong></td><td>"+retrieveNDBI(f, "2021")+"</td></tr></table></div>")

                if(!lock){
                  l.addEventListener('dblclick', function(e){
                    let el = e.target._latlngs[0][0][0];
                    setCenter([el.lat, el.lng]);
                    setZoom(13);
                  })
                }
              }}   />
      ) : current === "2014" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2014)          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDBI2013</strong></td><td>"+retrieveNDBI(f, "2013")+"</td></tr><tr><td><strong>NDBI2014</strong></td><td>"+retrieveNDBI(f, "2014")+"</td></tr><tr><td><strong>NDBI2015</strong></td><td>"+retrieveNDBI(f, "2015")+"</td></tr><tr><td><strong>NDBI2016</strong></td><td>"+retrieveNDBI(f, "2016")+"</td></tr><tr><td><strong>NDBI2017</strong></td><td>"+retrieveNDBI(f, "2017")+"</td></tr><tr><td><strong>NDBI2018</strong></td><td>"+retrieveNDBI(f, "2018")+"</td></tr><tr><td><strong>NDBI2019</strong></td><td>"+retrieveNDBI(f, "2019")+"</td></tr><tr><td><strong>NDBI2020</strong></td><td>"+retrieveNDBI(f, "2020")+"</td></tr><tr><td><strong>NDBI2021</strong></td><td>"+retrieveNDBI(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}   />
      ) : current === "2015" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2015)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDBI2013</strong></td><td>"+retrieveNDBI(f, "2013")+"</td></tr><tr><td><strong>NDBI2014</strong></td><td>"+retrieveNDBI(f, "2014")+"</td></tr><tr><td><strong>NDBI2015</strong></td><td>"+retrieveNDBI(f, "2015")+"</td></tr><tr><td><strong>NDBI2016</strong></td><td>"+retrieveNDBI(f, "2016")+"</td></tr><tr><td><strong>NDBI2017</strong></td><td>"+retrieveNDBI(f, "2017")+"</td></tr><tr><td><strong>NDBI2018</strong></td><td>"+retrieveNDBI(f, "2018")+"</td></tr><tr><td><strong>NDBI2019</strong></td><td>"+retrieveNDBI(f, "2019")+"</td></tr><tr><td><strong>NDBI2020</strong></td><td>"+retrieveNDBI(f, "2020")+"</td></tr><tr><td><strong>NDBI2021</strong></td><td>"+retrieveNDBI(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2016" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2016)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDBI2013</strong></td><td>"+retrieveNDBI(f, "2013")+"</td></tr><tr><td><strong>NDBI2014</strong></td><td>"+retrieveNDBI(f, "2014")+"</td></tr><tr><td><strong>NDBI2015</strong></td><td>"+retrieveNDBI(f, "2015")+"</td></tr><tr><td><strong>NDBI2016</strong></td><td>"+retrieveNDBI(f, "2016")+"</td></tr><tr><td><strong>NDBI2017</strong></td><td>"+retrieveNDBI(f, "2017")+"</td></tr><tr><td><strong>NDBI2018</strong></td><td>"+retrieveNDBI(f, "2018")+"</td></tr><tr><td><strong>NDBI2019</strong></td><td>"+retrieveNDBI(f, "2019")+"</td></tr><tr><td><strong>NDBI2020</strong></td><td>"+retrieveNDBI(f, "2020")+"</td></tr><tr><td><strong>NDBI2021</strong></td><td>"+retrieveNDBI(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2017" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2017)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDBI2013</strong></td><td>"+retrieveNDBI(f, "2013")+"</td></tr><tr><td><strong>NDBI2014</strong></td><td>"+retrieveNDBI(f, "2014")+"</td></tr><tr><td><strong>NDBI2015</strong></td><td>"+retrieveNDBI(f, "2015")+"</td></tr><tr><td><strong>NDBI2016</strong></td><td>"+retrieveNDBI(f, "2016")+"</td></tr><tr><td><strong>NDBI2017</strong></td><td>"+retrieveNDBI(f, "2017")+"</td></tr><tr><td><strong>NDBI2018</strong></td><td>"+retrieveNDBI(f, "2018")+"</td></tr><tr><td><strong>NDBI2019</strong></td><td>"+retrieveNDBI(f, "2019")+"</td></tr><tr><td><strong>NDBI2020</strong></td><td>"+retrieveNDBI(f, "2020")+"</td></tr><tr><td><strong>NDBI2021</strong></td><td>"+retrieveNDBI(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2018" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2018)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDBI2013</strong></td><td>"+retrieveNDBI(f, "2013")+"</td></tr><tr><td><strong>NDBI2014</strong></td><td>"+retrieveNDBI(f, "2014")+"</td></tr><tr><td><strong>NDBI2015</strong></td><td>"+retrieveNDBI(f, "2015")+"</td></tr><tr><td><strong>NDBI2016</strong></td><td>"+retrieveNDBI(f, "2016")+"</td></tr><tr><td><strong>NDBI2017</strong></td><td>"+retrieveNDBI(f, "2017")+"</td></tr><tr><td><strong>NDBI2018</strong></td><td>"+retrieveNDBI(f, "2018")+"</td></tr><tr><td><strong>NDBI2019</strong></td><td>"+retrieveNDBI(f, "2019")+"</td></tr><tr><td><strong>NDBI2020</strong></td><td>"+retrieveNDBI(f, "2020")+"</td></tr><tr><td><strong>NDBI2021</strong></td><td>"+retrieveNDBI(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : current === "2019" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2019)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDBI2013</strong></td><td>"+retrieveNDBI(f, "2013")+"</td></tr><tr><td><strong>NDBI2014</strong></td><td>"+retrieveNDBI(f, "2014")+"</td></tr><tr><td><strong>NDBI2015</strong></td><td>"+retrieveNDBI(f, "2015")+"</td></tr><tr><td><strong>NDBI2016</strong></td><td>"+retrieveNDBI(f, "2016")+"</td></tr><tr><td><strong>NDBI2017</strong></td><td>"+retrieveNDBI(f, "2017")+"</td></tr><tr><td><strong>NDBI2018</strong></td><td>"+retrieveNDBI(f, "2018")+"</td></tr><tr><td><strong>NDBI2019</strong></td><td>"+retrieveNDBI(f, "2019")+"</td></tr><tr><td><strong>NDBI2020</strong></td><td>"+retrieveNDBI(f, "2020")+"</td></tr><tr><td><strong>NDBI2021</strong></td><td>"+retrieveNDBI(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}   />
      ) : current === "2020" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2020)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDBI2013</strong></td><td>"+retrieveNDBI(f, "2013")+"</td></tr><tr><td><strong>NDBI2014</strong></td><td>"+retrieveNDBI(f, "2014")+"</td></tr><tr><td><strong>NDBI2015</strong></td><td>"+retrieveNDBI(f, "2015")+"</td></tr><tr><td><strong>NDBI2016</strong></td><td>"+retrieveNDBI(f, "2016")+"</td></tr><tr><td><strong>NDBI2017</strong></td><td>"+retrieveNDBI(f, "2017")+"</td></tr><tr><td><strong>NDBI2018</strong></td><td>"+retrieveNDBI(f, "2018")+"</td></tr><tr><td><strong>NDBI2019</strong></td><td>"+retrieveNDBI(f, "2019")+"</td></tr><tr><td><strong>NDBI2020</strong></td><td>"+retrieveNDBI(f, "2020")+"</td></tr><tr><td><strong>NDBI2021</strong></td><td>"+retrieveNDBI(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      ) : (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2021)
          }
        }} onEachFeature={(f, l) => {
          l.bindPopup("<div style='height: 150px; overflow-y: auto'> <table class='table table-stripped'><tr><td><strong>ward</strong></td><td>"+f.properties.ward+"</td></tr><tr><td><strong>Subcounty</strong></td><td>"+f.properties.subcounty+"</td></tr><tr><td><strong>NDBI2013</strong></td><td>"+retrieveNDBI(f, "2013")+"</td></tr><tr><td><strong>NDBI2014</strong></td><td>"+retrieveNDBI(f, "2014")+"</td></tr><tr><td><strong>NDBI2015</strong></td><td>"+retrieveNDBI(f, "2015")+"</td></tr><tr><td><strong>NDBI2016</strong></td><td>"+retrieveNDBI(f, "2016")+"</td></tr><tr><td><strong>NDBI2017</strong></td><td>"+retrieveNDBI(f, "2017")+"</td></tr><tr><td><strong>NDBI2018</strong></td><td>"+retrieveNDBI(f, "2018")+"</td></tr><tr><td><strong>NDBI2019</strong></td><td>"+retrieveNDBI(f, "2019")+"</td></tr><tr><td><strong>NDBI2020</strong></td><td>"+retrieveNDBI(f, "2020")+"</td></tr><tr><td><strong>NDBI2021</strong></td><td>"+retrieveNDBI(f, "2021")+"</td></tr></table></div>")
          if(!lock){
            l.addEventListener('dblclick', function(e){
              let el = e.target._latlngs[0][0][0];
              setCenter([el.lat, el.lng]);
              setZoom(13);
            })
          }
        }}  />
      )}
      </MapContainer>
    )
  }

  React.useEffect(()=> {
    let arr1 = []; //2013
    let arr2 = []; // 2013
    let arr3 = []; //2013

    for(let i=0; i<wards.features.length; i++){
      let feature = wards.features[i];
      arr1.push(feature.properties.LST2013);
      arr2.push(feature.properties.NDVI2013);
      arr3.push(feature.properties.NDBI2013);
    }
  }, []);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      aside={
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 300, lg: 400 }}>
            <Group position='apart' >
            <Title order={4}>{current}</Title>
            </Group>
            <Box style={{height: (height - 100) * 0.33}} >
            <Scatter style={{height: '100%'}} options={options} data={data} />
            </Box>

            <Box style={{height: (height - 100) * 0.33}}  >
            <Scatter style={{height: '100%'}} options={options} data={data2} />
            </Box>

            <Box style={{height: (height - 100) * 0.33}}>
              <Bar options={options} data={data3} />
            </Box>
          </Aside>
        </MediaQuery>
        
      }
      header={
        <Header height={60} p="md">
          <Group position='apart' align='center' >
            <Title order={2} >
              Land Surface Temperature
            </Title>

          <MediaQuery smallerThan="lg" styles={{display: 'none'}}>
          <Group>
              <Button onClick={() => {playAnimation()}} id="play-btn" variant='outline'  color='gray' leftIcon={<Video />} >Play Changes</Button>
            <NumberInput min={0} max={10} value={anim} color='gray' onChange={(val) => {setAnimSpeed(val)}} placeholder='Animation speed' />
            <NumberInput min={2013} value={parseInt(current)} onChange={(val) => {handleYearChange(val)}} max={2021} color='gray' placeholder='Year to show' />
            <Switch color="orange" label="Lock Map Scroll" checked={lock} onChange={(e) => {setLocked(e.currentTarget.checked)}} />
            <Switch label="Loop" checked={loop} onChange={(e) => {handleSwitch(e)}} />
            </Group>
          </MediaQuery>
          </Group>
        </Header>
      }
    >
      <Grid columns={24}>
        <Grid.Col span={12}>
        <Box style={{height: (height - 130) / 2, marginBottom: 2}} >
        <Text>{`LST - ${current}`}</Text>
          <MapPanel />
      </Box >
        </Grid.Col>
        <Grid.Col span={12}>
        <Box style={{height: (height - 130) / 2, marginBottom: 2}} >
        <Text>{`LST Above Mean - ${current}`}</Text>
          <MapMean />
      </Box >
        </Grid.Col>
      </Grid>
        <Grid columns={24}>

          <Grid.Col span={12}>
          <Box style={{height: (height - 130) / 2, marginTop: 20}}>
            <Text>{`NDVI - ${current}`}</Text>
          <NDVIMap />
            </Box>
          </Grid.Col>
          <Grid.Col style={{height: '100%'}} span={12}>
          <Box style={{height: (height - 130) / 2, marginTop: 20,}}>
            <Text>{`NDBI - ${current}`}</Text>
          <NDBIMap />
            </Box>
          </Grid.Col>
        </Grid>
    </AppShell>
  );
}
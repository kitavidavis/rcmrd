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
} from 'chart.js';
import { Scatter, Line } from 'react-chartjs-2';
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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Dashboard() {
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

  const [arrdata, setArrData] = useState(null);
  const [arrdata2, setArrData2] = useState(null);

  let lst2013 = [];
  let ndvi2013 = [];
  let ndb12013 = [];

  const ZoomComponent = () => {
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoom(mapEvents.getZoom());
        },
        moveend: () => {
          let el = mapEvents.getCenter();
          setCenter([el.lat, el.lng])
        },
    });


    return null
}



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
      
            arrdatat.push({x: item.properties.LST2014, y: item.properties.NDVI2014})
            arrdata2t.push({x: item.properties.LST2014, y: item.properties.NDBI2014})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2014")

        break;

      case "2015":
        wards.features.forEach((item) => {
          if(item.properties.LST2015 !== null && item.properties.NDVI2015 !== null){
      
            arrdatat.push({x: item.properties.LST2015, y: item.properties.NDVI2015})
            arrdata2t.push({x: item.properties.LST2015, y: item.properties.NDBI2015})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2015")

        break;

      case "2016":
        wards.features.forEach((item) => {
          if(item.properties.LST2016 !== null && item.properties.NDVI2016 !== null){
      
            arrdatat.push({x: item.properties.LST2016, y: item.properties.NDVI2016})
            arrdata2t.push({x: item.properties.LST2016, y: item.properties.NDBI2016})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2016")

        break;

      case "2017":
        wards.features.forEach((item) => {
          if(item.properties.LST2017 !== null && item.properties.NDVI2017 !== null){
      
            arrdatat.push({x: item.properties.LST2017, y: item.properties.NDVI2017})
            arrdata2t.push({x: item.properties.LST2017, y: item.properties.NDBI2017})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2017")

        break;

      case "2018":
        wards.features.forEach((item) => {
          if(item.properties.LST2018 !== null && item.properties.NDVI2018 !== null){
      
            arrdatat.push({x: item.properties.LST2018, y: item.properties.NDVI2018})
            arrdata2t.push({x: item.properties.LST2018, y: item.properties.NDBI2018})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2018")

        break;

      case "2019":
        wards.features.forEach((item) => {
          if(item.properties.LST2019 !== null && item.properties.NDVI2019 !== null){
      
            arrdatat.push({x: item.properties.LST2019, y: item.properties.NDVI2019})
            arrdata2t.push({x: item.properties.LST2019, y: item.properties.NDBI2019})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2019")

        break;

      case "2020":
        wards.features.forEach((item) => {
          if(item.properties.LST2020 !== null && item.properties.NDVI2020 !== null){
      
            arrdatat.push({x: item.properties.LST2020, y: item.properties.NDVI2020})
            arrdata2t.push({x: item.properties.LST2020, y: item.properties.NDBI2020})
          } 
        });
      
        onChange(arrdatat, arrdata2t, "2020")

        break;

      case "2021":
        wards.features.forEach((item) => {
          if(item.properties.LST2021 !== null && item.properties.NDVI2021 !== null){
      
            arrdatat.push({x: item.properties.LST2021, y: item.properties.NDVI2021})
            arrdata2t.push({x: item.properties.LST2021, y: item.properties.NDBI2021})
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
  if(playing){
    resetNavigationProgress();
  }
  setPlaying(false);

  wards.features.forEach((item) => {
    if(item.properties.LST2013 !== null && item.properties.NDVI2013 !== null){

      arrdatat.push({x: item.properties.LST2013, y: item.properties.NDVI2013})
      arrdata2t.push({x: item.properties.LST2013, y: item.properties.NDBI2013})
    } 
  });

  onChange(arrdatat, arrdata2t, "2013")
 }

 const handle2014 = () => {
  let arrdatat = [];
  let arrdata2t = []

  wards.features.forEach((item) => {
    if(item.properties.LST2014 !== null && item.properties.NDVI2014 !== null){

      arrdatat.push({x: item.properties.LST2014, y: item.properties.NDVI2014})
      arrdata2t.push({x: item.properties.LST2014, y: item.properties.NDBI2014})
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

      arrdatat.push({x: item.properties.LST2015, y: item.properties.NDVI2015})
      arrdata2t.push({x: item.properties.LST2015, y: item.properties.NDBI2015})
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

      arrdatat.push({x: item.properties.LST2016, y: item.properties.NDVI2016})
      arrdata2t.push({x: item.properties.LST2016, y: item.properties.NDBI2016})
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

      arrdatat.push({x: item.properties.LST2017, y: item.properties.NDVI2017})
      arrdata2t.push({x: item.properties.LST2017, y: item.properties.NDBI2017})
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

      arrdatat.push({x: item.properties.LST2018, y: item.properties.NDVI2018})
      arrdata2t.push({x: item.properties.LST2018, y: item.properties.NDBI2018})
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

      arrdatat.push({x: item.properties.LST2019, y: item.properties.NDVI2019})
      arrdata2t.push({x: item.properties.LST2019, y: item.properties.NDBI2019})
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

      arrdatat.push({x: item.properties.LST2020, y: item.properties.NDVI2020})
      arrdata2t.push({x: item.properties.LST2020, y: item.properties.NDBI2020})
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

      arrdatat.push({x: item.properties.LST2021, y: item.properties.NDVI2021})
      arrdata2t.push({x: item.properties.LST2021, y: item.properties.NDBI2021})
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

  const delay = () => {
    return new Promise(resolve => {
      setTimeout(resolve, (anim * 1000));
    });
  }

  const playAnimation = () => {
    setPlaying(true);
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

    React.useEffect(() => {
      const loadLegend = () => {
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
              '<i style="background:' +
                getColor(from + 1) +
                '"></i> ' +
                from +
                (to ? "&ndash;" + to : "+")
            );
          }
    
          div.innerHTML = labels.join("<br>");          return div;
        };
  
        legend.addTo(map);
      }

      if(map){
        loadLegend();
      }
    }, [map])

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
    let total = (feature.properties.LST2013 + feature.properties.LST2014 + feature.properties.LST2015 + feature.properties.LST2016 + feature.properties.LST2017 +
      feature.properties.LST2018 + feature.properties.LST2019 + feature.properties.LST2020 + feature.properties.LST2021);

    let mean = total / 9;

    switch(current){
      case "2013":
        if(feature.properties.LST2013 > mean){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2014":
        if(feature.properties.LST2014 > mean){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2015":
        if(feature.properties.LST2015 > mean){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2016":
        if(feature.properties.LST2016 > mean){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2017":
        if(feature.properties.LST2017 > mean){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2018":
        if(feature.properties.LST2018 > mean){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2019":
        if(feature.properties.LST2019 > mean){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2020":
        if(feature.properties.LST2020 > mean){
          return "#D9480F"
        } else {
          return "gray";
        }

      case "2021":
        if(feature.properties.LST2021 > mean){
          return "#D9480F"
        } else {
          return "gray";
        }

      default:
        //do nothing.
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
              }}  />
      </MapContainer>
    )
}

  const MapPanel = () => {
    return (
        <MapContainer style={{height: '100%', width: '100%', backgroundColor: '#101113'}}  center={center} zoom={zoom} scrollWheelZoom={false}>

<ZoomComponent />
      {current === "2013" ? (
              <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleLSTColor(feature.properties.LST2013)
                }
              }} onEachFeature={(f, l) => {
                l.addEventListener('click', function(e){
                  let el = e.target._latlngs[0][0][0];
                  setCenter([el.lat, el.lng]);
                  setZoom(13);
                  l.bindPopup("<table><tr><td></td><td>"+f.properties.ward+"</td></tr><tr><td>Subcounty</td><td>"+f.properties.subcounty+"</td></tr></table>").togglePopup();
                })
              }}  />
      ) : current === "2014" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor:  onStyleLSTColor(feature.properties.LST2014)
          }
        }}  onEachFeature={(f, l) => {
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
        }}  />
      )}
      </MapContainer>
    )
  }

  const NDVIMap = () => {
    return (
        <MapContainer style={{height: '100%', width: '100%', backgroundColor: '#101113'}}  center={center} zoom={zoom} scrollWheelZoom={false}>
<ZoomComponent />
      {current === "2013" ? (
              <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleNDVIColor(feature.properties.NDVI2013)
                }
              }} onEachFeature={(f, l) => {
                l.addEventListener('click', function(e){
                  let el = e.target._latlngs[0][0][0];
                  setCenter([el.lat, el.lng]);
                  setZoom(13);
                })
              }}   />
      ) : current === "2014" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2014)          }
        }} onEachFeature={(f, l) => {
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
        }}  />
      )}
      </MapContainer>
    )
  }

  const NDBIMap = () => {
    return (
        <MapContainer style={{height: '100%', width: '100%', backgroundColor: '#101113'}}  center={center} zoom={zoom} scrollWheelZoom={false}>

<ZoomComponent />
      {current === "2013" ? (
              <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleNDBIColor(feature.properties.NDBI2013)
                }
              }} onEachFeature={(f, l) => {
                l.addEventListener('click', function(e){
                  let el = e.target._latlngs[0][0][0];
                  setCenter([el.lat, el.lng]);
                  setZoom(13);
                })
              }}   />
      ) : current === "2014" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2014)          }
        }} onEachFeature={(f, l) => {
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
          l.addEventListener('click', function(e){
            let el = e.target._latlngs[0][0][0];
            setCenter([el.lat, el.lng]);
            setZoom(13);
          })
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
            <Box style={{height: (height - 100) * 0.5}} >
            <Scatter style={{height: '100%'}} options={options} data={data} />
            </Box>

            <Box style={{height: (height - 100) * 0.5}}  >
            <Scatter style={{height: '100%'}} options={options} data={data2} />
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
              <Button onClick={() => {playAnimation()}} variant='outline'  color='gray' leftIcon={<Video />} >Play Changes</Button>
            <NumberInput min={0} max={10} value={anim} color='gray' onChange={(val) => {setAnimSpeed(val)}} placeholder='Animation speed' />
            <NumberInput min={2013} value={parseInt(current)} onChange={(val) => {handleYearChange(val)}} max={2021} color='gray' placeholder='Year to show' />
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
        <Text>{`LST Mean - ${current}`}</Text>
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
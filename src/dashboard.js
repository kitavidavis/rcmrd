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
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
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
import { Scatter } from 'react-chartjs-2';
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
  const [anim, setAnimSpeed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pause, setPause] = useState(false);
  const [lst13, setLST13] = useState(null);
  const [lst14, setLST14] = useState(null);
  const [lst15, setLST15] = useState(null);
  const [lst16, setLST16] = useState(null);
  const [lst17, setLST17] = useState(null);
  const [lst18, setLST18] = useState(null);
  const [lst19, setLST19] = useState(null);
  const [lst20, setLST20] = useState(null);
  const [lst21, setLST21] = useState(null);

  const [ndvi13, setNDVI13] = useState(null);
  const [ndvi14, setNDVI14] = useState(null); 
  const [ndvi15, setNDVI15] = useState(null);
  const [ndvi16, setNDVI16] = useState(null);
  const [ndvi17, setNDVI17] = useState(null);
  const [ndvi18, setNDVI18] = useState(null);
  const [ndvi19, setNDVI19] = useState(null);
  const [ndvi20, setNDVI20] = useState(null);
  const [ndvi21, setNDVI21] = useState(null);

  const [ndbi13, setNDBI13] = useState(null);
  const [ndbi14, setNDBI14] = useState(null);
  const [ndbi15, setNDBI15] = useState(null);
  const [ndbi16, setNDBI16] = useState(null);
  const [ndbi17, setNDBI17] = useState(null);
  const [ndbi18, setNDBI18] = useState(null);
  const [ndbi19, setNDBI19] = useState(null);
  const [ndbi20, setNDBI20] = useState(null);
  const [ndbi21, setNDBI21] = useState(null);

  const [done, setDone] = useState(false);

  const [totalNDVI, setTotalNDVI] = useState(null);
  const [totalLST, setTotalLST] = useState(null);
  const [totlaNDBI, setTotalNDBI] = useState(null);

  const [arrdata, setArrData] = useState(null);
  const [arrdata2, setArrData2] = useState(null);

  let lst2013 = [];
  let ndvi2013 = [];
  let ndb12013 = [];

  const onChange = React.useCallback((arr1, arr2, yr) => {
    setArrData(arr1);
    setArrData2(arr2);
    setCurrent(yr)
  }, []);

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

  const handlePause = () => {
    if(pause){
      switch(current){
        case '2013':
          return handle2013();

        case '2014':
          return handle2014();

        case '2015':
          return handle2015();

        case '2016':
          return handle2016();

        case '2017':
          return handle2017();

        case '2018':
          return handle2018();

        case '2019':
          return handle2019();

        case '2020':
          return handle2020();

        case '2021':
          return handle2021();

        default:
          //ignore
      }
    }
    setPause(!pause);
  }

  const onStyleLSTColor = React.useCallback((n) => {
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

  }, []);

  const onStyleNDVIColor = React.useCallback((n) => {
    if(n <= 0.2){
      return "#d7191c"
  } else if(n <= 0.4) {
      return "#fdae61"
  } else if(n <= 0.6) {
      return "#ffffbf"
  } else if(n <= 0.8){
      return "#a6d96a"
  } else {
      return "#1a9641"
  }
  }, []);

  const onStyleNDBIColor = React.useCallback((p ) => {
    let n = p * 10;
    if(n <= 0){
      return "#e66101"
  } else if(n <= 0.2) {
      return "#fdb863"
  } else if(n <= 0.4) {
      return "#f7f7f7"
  } else if(n <= 0.6){
      return "#b2abd2"
  } else {
      return "#5e3c99"
  }
  }, [])

  const MapPanel = () => {
    return (
        <MapContainer style={{height: '100%', width: '100%'}}  center={[-1.286389, 36.817223]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

      {current === "2013" ? (
              <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleLSTColor(feature.properties.LST2013)
                }
              }}  />
      ) : current === "2014" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor:  onStyleLSTColor(feature.properties.LST2014)
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
        }}  />
      ) : current === "2016" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleLSTColor(feature.properties.LST2016)
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
        }}  />
      ) : current === "2018" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleLSTColor(feature.properties.LST2018)
          }
        }}  />
      ) : current === "2019" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleLSTColor(feature.properties.LST2019)
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
        }}  />
      ) : (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor:  onStyleLSTColor(feature.properties.LST2021)
          }
        }}  />
      )}
      </MapContainer>
    )
  }

  const NDVIMap = () => {
    return (
        <MapContainer style={{height: '100%', width: '100%'}}  center={[-1.286389, 36.817223]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

      {current === "2013" ? (
              <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleNDVIColor(feature.properties.NDVI2013)
                }
              }}  />
      ) : current === "2014" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2014)          }
        }}  />
      ) : current === "2015" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2015)
          }
        }}  />
      ) : current === "2016" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2016)
          }
        }}  />
      ) : current === "2017" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2017)
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
        }}  />
      ) : current === "2019" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2019)
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
        }}  />
      ) : (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDVIColor(feature.properties.NDVI2021)
          }
        }}  />
      )}
      </MapContainer>
    )
  }

  const NDBIMap = () => {
    return (
        <MapContainer style={{height: '100%', width: '100%'}}  center={[-1.286389, 36.817223]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

      {current === "2013" ? (
              <GeoJSON data={wards} style={(feature) => {
                return {
                    color: 'white',
                    opacity: 0.5,
                    fillOpacity: 1,
                    fillColor: onStyleNDBIColor(feature.properties.NDBI2013)
                }
              }}  />
      ) : current === "2014" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2014)          }
        }}  />
      ) : current === "2015" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2015)
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
        }}  />
      ) : current === "2017" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2017)
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
        }}  />
      ) : current === "2019" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2019)
          }
        }}  />
      ) : current === "2020" ? (
        <GeoJSON data={wards} style={(feature) => {
          return {
              color: 'white',
              opacity: 0.5,
              fillOpacity: 1,
              fillColor: onStyleNDBIColor(feature.properties.NDBI2020)
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
            <NumberInput min={2013} value={parseInt(current)} onChange={(val) => {val < 2013 ? setCurrent("2013") : val > 2021 ? setCurrent("2021") : setCurrent(val.toString())}} max={2021} color='gray' placeholder='Year to show' />
            </Group>
          </MediaQuery>
          </Group>
        </Header>
      }
    >
      <Box style={{height: (height - 100) / 2, marginBottom: 2}} >
          <MapPanel />
      </Box >
        <Grid columns={24}>

          <Grid.Col span={12}>
          <Box style={{height: (height - 100) / 2}}>
          <NDVIMap />
            </Box>
          </Grid.Col>
          <Grid.Col style={{height: '100%'}} span={12}>
          <Box style={{height: (height - 100) / 2}}>
          <NDBIMap />
            </Box>
          </Grid.Col>
        </Grid>
    </AppShell>
  );
}
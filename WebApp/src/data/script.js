console.log('Hello TensorFlow');

async function getData() {
    const waterDataReq = await fetch('https://raw.githubusercontent.com/tarun-29/Water-Project-Intern/master/water.json');  
    console.log("ofjgrhdsngjvn")
    const waterData = await waterDataReq.json();  
    console.log(waterData)
    const cleaned = waterData.map(w => ({
      mpg: w.Miles_per_Gallon,
      horsepower: car.Horsepower,
    }))
    .filter(car => (car.mpg != null && car.horsepower != null));
    
    return cleaned;
  }

  getData()
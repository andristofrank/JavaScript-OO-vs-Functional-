//Constant for Weather Data type
var type ={
    PRECIPITATION: "Precipitation",
    PRECIPITATIONPREDICTION: "PrecipitationPrediction",
    TEMPERATURE: "Temperature",
    TEMPERATUREPREDICTION: "TemperaturePrediction",
    WIND: "Wind",
    WINDPREDICTION: "WindPrediction",
    CLOUDCOVERAGE :"CloudCoverage",
    CLOUDCOVERAGEPREDICTION :"CloudCoveragePrediction"

}
var Units ={
    INTERNATIONAL: "INT",
    US: "US"
}
/***********************/
/***********************/
/*****GETTERS AND SETTERS*/
/***********************/
fromGS = (state) => ({
    getFrom() {return state.from},
    setFrom(newFrom) {state.to = newFrom}
})

toGS = (state) => ({
    getTo() {return state.from},
    setTo(newTo){state.to = newTo}
})

weatherData = (state) => ({
    /**Data Type */
    getType() { return state.type },
    setType(newType) {state.type = newType},

    getUnit() { return state.unit},
    setUnit(newUnit){ state.unit = newUnit},

    /**Event Type */
    getTime(){ return state.time },
    setTime(newTime){state.time = newTime},

    getPlace(){ return state.place },
    setPlace(newPlace){state.place = newPlace },

    /** value*/
    getValue() { return state.value},
    setValue(newValue){ state.value = newValue }
})

weatherPrediction = (state) => ({
     /**Data Type */
     getType() { return state.type },
     setType(newType) {state.type = newType},
 
     getUnit() { return state.unit},
     setUnit(newUnit){ state.unit = newUnit},
 
     /**Event Type */
     getTime(){ return state.time },
     setTime(newTime){state.time = newTime},
 
     getPlace(){ return state.place },
     setPlace(newPlace){state.place = newPlace },

     /**From --> To values */
     getFrom() {return state.from},
     setFrom(newFrom) {state.from = newFrom},
     getTo() {return state.to},
     setTo(newTo){state.to = newTo}
})

precipitationTypeGS = (state) => ({
    getPrecipitationType(){return state.precipitationType },
    setPrecipitationType(newPt) { state.precipitationType = newPt }
})
precipitationTypeSGS = (state) => ({
    getPrecipitationTypes() { return state.precipitationTypes},
    setPrecipitationTypes(newPts) { state.precipitationTypes = newPts},
    addPrecipitationType(newPt) {state.precipitationTypes.push(newPt)},
    removePrecipitationType(prtTy) { 
        state.precipitationTypes.filter(function(type){
        if(prtTy === type) return false;
        return true;
    })}
})
windDirectionsGS = (state) => ({
    getWindDirections() { return state.directions},
    setWindDirections(newDirections) { state.directions = newDirections},
    addWindDirection(newDirection) {state.directions.push(newDirection)},
    removeWindDirection(direction) { 
        state.directions.filter(function(dir){
        if(direction === dir) return false;
        return true;
    })}
})
windDirectionGS = (state) => ({
    direction(){return state.direction },
    setDirection(newDirection){state.direction = newDirection }
})

currentPlaceGS = (state) => ({
    getCurrentPlace(){ return state.currentPlace },
    setCurrentPlace(newCurrentPlace){ state.currentPlace = newCurrentPlace },
    clearCurrentPlace(){state.currentPlace = ""}
})

currentPeriodGS = (state) => ({
    getCurrentPeriod(){ return state.currentPeriod },
    setCurrentPeriod(newPeriod) { state.currentPeriod = newPeriod },
    clearCurrentPeriod(){state.currentPeriod = ""} 
})

currentTypeGS = (state) => ({
    getCurrentType(){return state.currentType },
    setCurrentType(newcurrentType){ state.currentType = newcurrentType },
    clearCurentType(){state.currentType = ""}
})

dataManipulation = (state) => ({
    add(newdata){state.data.push(newdata);},
    data(){return state.data}
})

dateIntevalContains = (state) => ({
    contains(d) { return d >= state.from && d <= state.to}
})
/*********************/
/*****Converters******/
/*********************/
UsConverter = (state) => ({
    convertToUsUnits(){
       state.data = state.data.map(function(weatherData){
            if(weatherData.getUnit() === Units.INTERNATIONAL){
            if(weatherData.getType().includes(type.PRECIPITATION)){
                weatherData.convertToInches();
                weatherData.setUnit(Units.US);
            }
            if(weatherData.getType().includes(type.WIND)){
                 weatherData.convertToMS();
                weatherData.setUnit(Units.US);

            }
            if(weatherData.getType().includes(type.TEMPERATURE)){
                weatherData.convertToF();
                weatherData.setUnit(Units.US);
            }
        }
        return weatherData;
        })
    }
})
InternationalConverter = (state) => ({
    convertToInternationalUnits(){
    state.data = state.data.map((weatherData)=> {
            if(weatherData.getUnit() == Units.US){

            if(weatherData.getType().includes(type.PRECIPITATION)){
              weatherData.convertToMM();
              weatherData.setUnit(Units.INTERNATIONAL);
            }
            if(weatherData.getType().includes(type.WIND)){
                weatherData.convertToMPH();
                weatherData.setUnit(Units.INTERNATIONAL);
            }
            if(weatherData.getType().includes(type.TEMPERATURE)){
                weatherData.convertToC();
                weatherData.setUnit(Units.INTERNATIONAL);
            }
        }
        return weatherData;
        },{})
    }
})

windConverter = (state) => ({
    convertToMPH(){
        
    if(state.type.includes("Prediction")){
        state.to = state.to * 2237
        state.from = state.from *2237
    }

    else state.value = state.value * 2237
    },
    convertToMS(){

        if(state.type.includes("Prediction")){
            state.to = state.to / 0.44704
            state.from = state.from / 0.44704
        }
    
        else state.value = state.value / 0.44704
        }
})

temperatureConverter = (state) => ({
    convertToC(){
        if(state.type.includes("Prediction"))
    {
        state.to = (state.to * 9/5)+ 32
        state.from = (state.from * 9/5)+ 32
    }
        else state.value = (state.value* 9/5)+ 32
    },
    convertToF(){
        if(state.type.includes("Prediction"))
    {
        state.to = (state.to-32)*5/9
        state.from = (state.from-32)*5/9
    }
        else state.value = (state.value-32)*5/9
    }
})

precipitationConverter = (state) => ({
    convertToInches(){
        if(state.type.includes("Prediction"))
    {
        state.to = state.to / 25.4
        state.from = state.from / 25.4
    }
        else   state.value = state.value / 25.4
    },
    convertToMM(){
        if(state.type.includes("Prediction"))
    {
        state.to = state.to * 25.4
        state.from = sstate.from * 25.4
    }
        else state.value = state.value * 25.4
    }
})
/*********************/
/*********************/
//*****Objects */
/*********************/

DateInterval = function(from, to){
    state={
        from,
        to
    }
    return Object.assign({},fromGS(state),toGS(state),dateIntevalContains(state))
}

Temperature = function(time, place,type, unit, value){

    state = {
        time,
        place,
        unit,
        type,
        value
    }
    return Object.assign({},weatherData(state),temperatureConverter(state))
}
Precipitation = function(time, place,type, unit, value, precipitationType){
    state = {
        time,
        place,
        unit,
        type,
        value,
        precipitationType
    }
    return Object.assign({},weatherData(state),precipitationTypeGS(state),precipitationConverter(state))
}
Wind = function(time, place,type, unit, value,direction){
    state = {
        time,
        place,
        type,
        unit,
        value,
        direction
    }
   return Object.assign({},weatherData(state),windDirectionGS(state),windConverter(state))
}
CloudCoverage = function(time, place,type, unit, value){
    state = {
        time,
        place,
        type,
        unit,
        value
    }
    return Object.assign({},weatherData(state),valueGS(state))
}
WeatherHistory = function(data, currentPeriod, currentPlace, currentType){
    state = {
        data,
        currentPeriod,
        currentPlace,
        currentType
    }
    return Object.assign({},dataManipulation(state),UsConverter(state),InternationalConverter(state),currentPlaceGS(state),currentPeriodGS(state),currentTypeGS(state))
}
TemperaturePrediction = function(time, place,type, unit, to, from){
    state = {
        time,
        place,
        type,
        unit,
        to,
        from
    }
   

    return Object.assign({},weatherPrediction(state),precipitationConverter(state),precipitationTypeSGS(state))
}

PrecipitationPrediction =function(time, place,type, unit,precipitationTypes, to, from){
    state = {
        time,
        place,
        type,
        precipitationTypes,
        unit,
        to,
        from
    }
    matches = function(data){
        return data.getValue() >= state.from 
        && data.getValue() <= state.to 
        && data.getPlace() == state.place 
        && data.getUnit() == state.unit
        && data.getTime() == state.time
        && state.precipitationTypes.includes(data.getPrecipitationType())
    };
    return Object.assign({},weatherPrediction(state),precipitationConverter(state),precipitationTypeSGS(state),{matches})
}

WindPrediction = function (time, place, type, unit, directions, to, from) {
    state = {
        time,
        place,
        type,
        directions,
        unit,
        to,
        from
    }
    matches = function(data){
        return data.getValue() >= state.from 
        && data.getValue() <= state.to 
        && data.getPlace() === state.place 
        && data.getUnit() === state.unit
        && data.getTime() === state.time
        && state.directions.includes(data.direction())
    };
    return Object.assign({},weatherPrediction(state),windConverter(state),windDirectionsGS(state))
}

CloudCoveragePrediction = function (time, place, type, unit, to , from){
    state = {
        time,
        place,
        type,
        unit,
        to,
        from
    }
    return Object.assign({},weatherPrediction(state))
}

WeatherForecast = function (data, currentPeriod, currentPlace, currentType){
    scope ={
        data,
        currentPeriod,
        currentPlace,
        currentType
    }
    return Object.assign({},dataManipulation(state),currentPeriodGS(state), currentPlaceGS(state),currentTypeGS(state),InternationalConverter(state),UsConverter(state))
}




temperature = Temperature("01","Horsens",type.TEMPERATURE,Units.US,12)
temperature2 = Temperature("02","Horsens",type.TEMPERATURE,Units.INTERNATIONAL,34)
wind = Wind("23","Vejle",type.WIND, Units.US,"2")

datas =[temperature,temperature2,wind]
currentPeriod = DateInterval("20/10","19/11")
weatherHistory =WeatherHistory(datas,currentPeriod,"Horses","Temp")

wind = Wind("23","Vejle",type.WIND, Units.US,"2","NV")
weatherHistory.add(wind)
console.log(weatherHistory.data())

temperature3 = Precipitation("01","Horsens",type.TEMPERATURE,"134",23,34)
temperature4 = PrecipitationPrediction("01","Horsens",type.TEMPERATURE,"134",[23,34,54],12,320)
console.log(temperature4.matches(temperature3))
//temperature output:
console.log()
console.log()
console.log("***********")
console.log("Temperature")
console.log("***********")
console.log("Value: " + temperature.getValue())
console.log("Place: " + temperature.getPlace())
console.log("Time: "+ temperature.getTime())
console.log("Unit: "+ temperature.getUnit())
console.log("Type: "+ temperature.getType())
console.log()
console.log()

console.log("**************")
console.log("Wind")
console.log("**************")
//wind output:
console.log("Value: " + wind.getValue())
console.log("Place: " + wind.getPlace())
console.log("Time: "+ wind.getTime())
console.log("Unit: "+ wind.getUnit())
console.log("Type: "+ wind.getType())
console.log("Direction: "+ wind.direction())

//convert to international Units
console.log("convert to international Units")
console.log()
console.log()
console.log("The value before:")
console.log("***********")
console.log("Temperature")
console.log("***********")
console.log("Value: " + temperature.getValue())
console.log("Place: " + temperature.getPlace())
console.log("Time: "+ temperature.getTime())
console.log("Unit: "+ temperature.getUnit())
console.log("Type: "+ temperature.getType())
console.log()
console.log()
weatherHistory.convertToInternationalUnits()
console.log("The value after conversion:")
console.log("***********")
console.log("Temperature")
console.log("***********")
console.log("Value: " + temperature.getValue())
console.log("Place: " + temperature.getPlace())
console.log("Time: "+ temperature.getTime())
console.log("Unit: "+ temperature.getUnit())
console.log("Type: "+ temperature.getType())


//console.log(weatherHistory.data()[0].getValue())//modified
//console.log(temperature.getValue())//modified 

//convert to US Units
console.log("***Convert to US Units***")
console.log()
console.log()
console.log("The value before:")
console.log("***********")
console.log("Temperature")
console.log("***********")
console.log("Value: " + temperature.getValue())
console.log("Place: " + temperature.getPlace())
console.log("Time: "+ temperature.getTime())
console.log("Unit: "+ temperature.getUnit())
console.log("Type: "+ temperature.getType())
console.log()
console.log()

weatherHistory.convertToUsUnits()
console.log("The value after conversion:")
console.log("***********")
console.log("Temperature")
console.log("***********")
console.log("Value: " + temperature.getValue())
console.log("Place: " + temperature.getPlace())
console.log("Time: "+ temperature.getTime())
console.log("Unit: "+ temperature.getUnit())
console.log("Type: "+ temperature.getType())


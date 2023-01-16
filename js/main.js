// https://cloud.ouraring.com/docs/
// https://cloud.ouraring.com/docs/sleep

// API URL
const APIURL = 'https://api.ouraring.com/v1'

// ENDPOINTS
const USER_INFO = 'userinfo'
const ACTIVITY = 'activity'
const READINESS = 'readiness'
const SLEEP = 'sleep'
const BEDTIME = 'bedtime'

// DATES
let START_DATE = '2023-01-08'
let END_DATE = '2023-01-13'

// token - this needs to be moved
let access_token = process.env.OURA_ACCESS_KEY

// GET USER INFORMATION
const getUserInfo = async () => {
    try {
        const response = await fetch(`${APIURL}/${USER_INFO}?start=${START_DATE}&end=${END_DATE}&access_token=${access_token}`)

        const data = await response.json()
        // console.log(data);

        // SHOW USER INFO
        showUserInfo(data)
    } catch (error) {
        console.log(error);
    }
}
// SHOW USER INFORMATION
const showUserInfo = (data) => {
    // deconstruct info from data
    const { age, email, gender, height, weight } = data
    
    // use info to populate elements
    $('#user').html('user: ' + email)
    $('#age').html('age: ' + age)
    $('#gender').html('gender: ' + gender)
    $('#height').html('height: ' + height + 'cm')
    $('#weight').html('weight: ' + weight + 'kg')
}
getUserInfo()



// GET USER SLEEP DATA
const getUserSleepData = async () => {
    try {
        const response = await fetch(`${APIURL}/${SLEEP}?start=${START_DATE}&end=${END_DATE}&access_token=${access_token}`)

        const data = await response.json()
        // console.log(data);

        // SHOW USER SLEEP DATA
        showUserSleepData(data)
    } catch (error) {
        console.log(error);
    }
}
// SHOW USER SLEEP DATA
const showUserSleepData = (data) => {
    let sleepDataWrapper = $('#sleep__data__wrapper')

    data.sleep.map((item, idx) => {
        console.log(item, idx) 
        // store (deconstruct) the values needed from the sleep item being looped through
        const { summary_date, bedtime_start, bedtime_end, duration, total, awake, rem, light, deep, hr_lowest, hr_average, hr_5min, efficiency, onset_latency, midpoint_time, restless, temperature_delta, breath_average, score, score_total, score_rem, score_deep, score_efficiency, score_latency, score_disturbances, score_alignment, hypnogram_5min, rmssd, rmssd_5min } = item
        
        // create wrapper for each item's fields
        let sleepItemWrapper = $('<div class="wrapper__sleep__item" />')

        // date of sleep data
        let sleepDate = createEl('sleep__date', `Sleep Date: ${summary_date}`)
        // bedtime start
        let sleepBedtimeStart = createEl('sleep__bedtime__start', `Start: ${bedtime_start}`)
        // bedtime end
        let sleepBedtimeEnd = createEl('sleep__bedtime__end', `End: ${bedtime_end}`)
        // sleep duration
        let sleepDuration = createEl('sleep__duration', `Duration: ${duration/60}m - (bedtime_end - bedtime_start)`)
        // total sleep
        let sleepTotal = createEl('sleep__total', `Total: ${total/60}m - (rem + light + deep)`)
        // awake time
        let sleepAwake = createEl('sleep__awake', `Time Awake: ${awake/60}m`)
        // rem sleep
        let sleepRem = createEl('sleep__rem', `Rem Sleep: ${rem/60}m`)
        // rem score
        let sleepRemScore = createEl('sleep__rem__score', `Rem Score: ${score_rem}/100`)
        // light sleep
        let sleepLight = createEl('sleep__light', `Light Sleep: ${light/60}m`)
        // deep sleep
        let sleepDeep = createEl('sleep__deep', `Deep Sleep: ${deep/60}m`)
        // deep score
        let sleepDeepScore = createEl('sleep__deep__score', `Deep Score: ${score_deep}/100`)
        // lowest heart rate
        let sleepHrLow = createEl('sleep__hrLow', `Lowest Heart Rate: ${hr_lowest}bpm`)
        // avg heart rate
        let sleepHrAvg = createEl('sleep__hrAvg', `Avg. Heart Rate: ${hr_average}bpm`)
        // heart rate 5 mins
        let sleepHr5 = createEl('sleep__hrAvg5', `Average heart rate for each beginning 5 minutes of the sleep period, the first period starting from sleep.bedtime_start: ${hr_5min}`)
        // efficiency
        let sleepEfficiency = createEl('sleep__efficiency', `Sleep Efficiency: ${efficiency}% - (100% * sleep.total / sleep.duration)`)
        // efficiency score
        let sleepEfficiencyScore = createEl('sleep__efficiency', `Sleep Efficiency Score: ${score_efficiency}/100`)
        // onset_latency
        let sleepOnsetLatency = createEl('sleep__onset__latency', `Sleep Onset Latency: ${onset_latency/60}m - Detected latency from bedtime_start to the beginning of the first five minutes of persistent sleep.`)
        // score latency
        let sleepScoreOnsetLatency = createEl('sleep__score__onset__latency', `Score Latency: ${score_latency}/100`)
        // midpoint
        let sleepMidpoint = createEl('sleep__midpoint', `Midpoint Sleep Percentage: ${midpoint_time/60}m`)
        // restless
        let sleepRestless = createEl('sleep__restless', `Restless Sleep Percentage: ${restless}%`)
        // temperature
        let sleepTemperature = createEl('sleep__temperature', `Skin Temperature Deviation: ${temperature_delta}c`)
        // breath average
        let sleepBreathAvg = createEl('sleep__breath__avg', `Breath Avg: ${breath_average}bpm`)
        // score
        let sleepScore = createEl('sleep__score', `Sleep Score: ${score}/100`)
        // score total
        let sleepScoreTotal = createEl('sleep__score_total', `Sleep Score Total: ${score_total}/100`)
        // score disturbances
        let sleepScoreDisturbances = createEl('sleep__score__disturbances', `Sleep Score Disturbances: ${score_disturbances}/100`)
        // score alignment
        let sleepScoreAlignment = createEl('sleep__score__alignment', `Sleep Score Alignment: ${score_alignment}/100`)
        // hypnogram 5min
        let sleepHypnogram5 = createEl('sleep__hypnogram5', `${hypnogram_5min}`)
        // rmssd
        let sleepRmssd = createEl('sleep__rmssd', `The average HRV calculated with rMSSD method: ${rmssd}ms`)
        // rmssd 5min
        let sleepRmssd5 = createEl('sleep__rmssd5', `The average HRV for each beginning 5 minutes of the sleep period: ${rmssd_5min}ms`)

        // add item fields to wrapper
        sleepItemWrapper.append(sleepDate, sleepBedtimeStart, sleepBedtimeEnd, sleepDuration, sleepTotal, sleepAwake, sleepRem, sleepRemScore, sleepLight, sleepDeep, sleepDeepScore, sleepHrLow, sleepHrAvg, sleepHr5, sleepEfficiency, sleepScoreOnsetLatency, sleepEfficiencyScore, sleepOnsetLatency, sleepMidpoint, sleepRestless, sleepTemperature, sleepBreathAvg, sleepScore, sleepScoreTotal, sleepScoreDisturbances, sleepScoreAlignment, sleepHypnogram5, sleepRmssd, sleepRmssd5)

        // add sleep item warpper to #sleepDataWrapper on index.html 
        sleepDataWrapper.append(sleepItemWrapper)
    })
}

getUserSleepData()

// used to create simple elements with a class and some text from the deconstructed API data
const createEl = (className, text) => {
    return $(`<div class="${className}" />`).text(`${text}`)
}

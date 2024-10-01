let production = false;

class Config {

    static appName = 'Synapse'
    static production = production
    static liveHost = ""
    
    static testHost =  " https://eb1.taramind.com"
   
    static baseUrl = production ? this.liveHost : this.testHost
    static AppVersion  = '1.0.0'
    
    static appHeaders = {
        Accept: "application/json", 
        "Content-type": "application/json",
        "app-version" : this.AppVersion
    }

}


export default Config
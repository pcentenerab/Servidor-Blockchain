function setup() {
    window.globalObject = {
        drizzle: [],
        drizzleState: {},
        account: ''
    }

    // let drizzle know what contract we want
    const options = {
        contracts: [ Contador ],
        web3: {
            fallback: {
                type: "ws",
                url: "ws://127.0.0.1:7545"
            }
        }
    };

    // setup the drizzle store and drizzle
    window.globalObject.drizzle = new Drizzle.Drizzle(options);
    
    window.globalObject.drizzle.store.subscribe(() => {
        const drizzleState = window.globalObject.drizzle.store.getState();
        if (window.globalObject.drizzle.store.getState().drizzleStatus.initialized) {
            //cada vez que cambia algo, actualizo el objeto con el estado
            window.globalObject.drizzleState = drizzleState;
            console.log("Estado actualizado");
            if (typeof webkit !== 'undefined') {
                webkit.messageHandlers.didFetchValue.postMessage("Estado actualizado");
            }
        }
    });
    return "Fin de la configuración";
}

function getKey() {
    if (window.globalObject.drizzleState.drizzleStatus.initialized) {
        let key = window.globalObject.drizzle.contracts.Contador.methods.valor.cacheCall();
        return("Mensaje recibido: La clave es "+key);
    } else {
        let string = JSON.stringify(window.globalObject.drizzleState)
        return("No inicializado. Drizzle state: "+string);
    }
}

function getValue(key) {
    if (window.globalObject.drizzleState.drizzleStatus.initialized) {
        let valor = window.globalObject.drizzleState.contracts.Contador.valor[key].value;
        return("Mensaje recibido: El valor es "+valor);
    } else {
        let string = JSON.stringify(window.globalObject.drizzleState)
        return("No inicializado. Drizzle state: "+string);
    }
}

function incr() {
    if (window.globalObject.drizzleState.drizzleStatus.initialized) {
        window.globalObject.drizzle.contracts.Contador.methods.incr.cacheSend({from: window.globalObject.drizzleState.accounts[0]});
        return "Incrementando valor";
    } else {
        let string = JSON.stringify(window.globalObject.drizzleState)
        return("No inicializado. Drizzle state: "+string);
    }
}

function decr() {
    if (window.globalObject.drizzleState.drizzleStatus.initialized) {
        window.globalObject.drizzle.contracts.Contador.methods.decr.cacheSend({from: window.globalObject.drizzleState.accounts[0]});
        return "Decrementando valor";
    } else {
        let string = JSON.stringify(window.globalObject.drizzleState)
        return("No inicializado. Drizzle state: "+string);
    }
}

function reset() {
    if (window.globalObject.drizzleState.drizzleStatus.initialized) {
        window.globalObject.drizzle.contracts.Contador.methods.reset.cacheSend({from: window.globalObject.drizzleState.accounts[0]});
        return "Restableciendo valor";
    } else {
        let string = JSON.stringify(window.globalObject.drizzleState)
        return("No inicializado. Drizzle state: "+string);
    }
}

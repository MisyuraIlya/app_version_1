export function setAgentUser(agent) {
    localStorage.setItem("agentUser", JSON.stringify(agent));
  }

export function fetchAgentUser() {
  return JSON.parse(localStorage.getItem("agent")).Id || '';
}  

export function fetchAgentName() {
  return JSON.parse(localStorage.getItem("agentUser")).Name || '';
}

export function fetchAgentUserExId() {
  return JSON.parse(localStorage.getItem("agentUser")).ExId || '';
}

export function fetchAgentNewGlobalFunc(history) {
  if(history.location.pathname == '/' && localStorage.agent){
    return JSON.parse(localStorage.getItem("agent")).Id || '';
  }else{
    if(localStorage.agent && JSON.parse(localStorage.agent).Super){
      let tmpSplit = history.location.pathname.split('/');
      if(tmpSplit && tmpSplit.length > 1){
        return tmpSplit[2]
      }
    }else if(localStorage.agent && !JSON.parse(localStorage.agent).Super){
      return JSON.parse(localStorage.getItem("agent")).Id || '';
    }
  }
}  
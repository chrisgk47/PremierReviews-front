export function loginUserFetch(userInfo){
    return dispatch=>fetch('http://localhost:3001/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo)
        })
        .then(r=>r.json())
        .then(data=>{
            if(data.error){
                alert(data.error)
            }else{
             let user_json = JSON.parse(data.user) 
             localStorage.setItem("token", data.jwt)
             dispatch(loginUser(user_json))
            }
         })
 }
export function createUser(userinfo){
    return dispatch=>fetch('http://localhost:3001/signup', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userinfo)
        }).then(r=>r.json())
           .then(data=>{
           if(data.error){
               alert(data.error)
           }else{
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
           }
        })
}
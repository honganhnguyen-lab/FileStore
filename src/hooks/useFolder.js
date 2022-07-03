import { useReducer, useEffect } from "react";
import { database } from '../Firebase';
import {getDoc, doc, docs, query, where, orderBy, onSnapshot, getDocs} from "@firebase/firestore"



const ACTIONS = {
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folders"
}

const ROOT_FOLDER = { name: "ROOT", id: null, path: [] }

const reducer = (state, {type, payload}) => {
    switch(type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: []

            }
        case ACTIONS.UPDATE_FOLDER: 
            return {
                ...state,
                folder: payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDERS: 
            return {
                ...state,
                childFolders: payload.childFolders
            }
        default:
            return state

    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })


useEffect(() => {
    dispatch({type: ACTIONS.SELECT_FOLDER, payload: {folderId, folder}})
}, [folderId, folder])

useEffect(() => {
    if(folderId == null) {
        return dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: {folder: ROOT_FOLDER}
        })
    }

    const docRef = doc(database.folders, folderId)

    getDoc(docRef).then(
         (doc) => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: {folder: database.formatDoc(doc)}
            })
            
         }
     ).catch(()=>{
        dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: {folder : ROOT_FOLDER}
        })
        
     })
}, [folderId])

useEffect(async() => {

    const filterRef = query(database.folders, where("parentId", "==", folderId), where("userId", "==", "Amie29" ), orderBy("createAt"))
   
    

    //  return querySnapshot.forEach((doc) => {
    //     console.log(doc)
    //     dispatch({
    //                type: ACTIONS.SET_CHILD_FOLDERS,
    //                 payload: {childFolders: database.formatDoc(doc)}
    //            })
    // })

    // console.log(querySnapshot)

     onSnapshot(filterRef, (snapshot) => {


       
        dispatch({
            type: ACTIONS.SET_CHILD_FOLDERS,
            payload: {childFolders: snapshot.docs.map(database.formatDoc )}
        })
    })

 

}, [folderId])

return state

}
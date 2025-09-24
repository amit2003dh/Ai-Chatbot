import { createContext, useState } from "react";
import run from "../config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {
    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [showResult,setShowResult] = useState(false);
    const [resultData,setresultData] = useState("");

    const newChat = () => {
        setShowResult(false)
    }

    const onSent = async(prompt) => {
        setShowResult(true)
        let response;
            setRecentPrompt(prompt)
            response = await run(prompt) 
           setresultData(response); // <-- Directly set the output
           setInput("") 
    }


    const contextValue = {
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider


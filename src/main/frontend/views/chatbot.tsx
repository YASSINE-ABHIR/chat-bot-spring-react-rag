import { Button, ProgressBar, TextArea } from "@vaadin/react-components";
import React, { useEffect, useState } from 'react';
import Markdown from "react-markdown";
import {ChatBotAiService} from "Frontend/generated/endpoints";

const Chatbot: React.FC = () => {
    const [question, setQuestion] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const textArea = document.getElementById("TextArea");

        if (textArea) {
            textArea.setAttribute("placeholder", "Your message")
            const handleChange = (ev: Event) => {
                const target = ev.target as HTMLTextAreaElement;
                setQuestion(target.value);
                if (target.value.trim() !== "" && target.value.trim().length > 5) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }
            };

            textArea.addEventListener("keyup", handleChange);

            // Clean up the event listener when the component unmounts
            return () => {
                textArea.removeEventListener("keyup", handleChange);
            };
        }
        return undefined;
    }, []);

    const sendQuestion = async () => {
        if(!isSubmitted) {
            setIsSubmitted(true);
        }
        if (question.trim() !== "" && question.trim().length >= 5) {
            setLoading(true);
            ChatBotAiService.ragChat(question).then((result) => {
                setResponse(result)
            }).then(() => {
                document.getElementById("TextArea")!.setAttribute("placeholder", question);
                setIsValid(false);
                setQuestion("");
                setLoading(false);
            }).catch( err => {
                console.error(err)
                setLoading(false);
                setIsValid(true);
            })
        }
    };

    return (
        <div className="container max-w-screen-md">
            <div className="card shadow border-0">
                <div className="card-header border-0 bg-light">
                    <h2>Ask the chatbot</h2>
                </div>
                <div className="card-body">
                    <TextArea
                        id="TextArea"
                        minlength={5}
                        readonly={loading}
                        className="w-100"
                        required
                        value={question}
                        helperText="Your query or message mustn't be less than 5 characters"
                    />
                    <Button
                        id="submitButton"
                        disabled={loading || !isValid}
                        className="ms-2 shadow-xs"
                        onClick={sendQuestion}
                    >
                        Send
                    </Button>
                    {isSubmitted && (
                        <div className="mt-3">
                            <p className="text-secondary">AI response</p>
                            {loading && (
                                <div>
                                    <ProgressBar indeterminate/>
                                </div>
                            )}
                            <Markdown className="text-secondary bg-secondary-subtle p-l rounded shadow font-bold">
                                {response}
                            </Markdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;

import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
const imgStyles = {
    with: '1rem'
}
export default function index(){
    return (
        <div className="container">
            <div className="card border-0 shadow">
                <div className="card-header border-0 flex justify-center align-items-center">
                    <img style={imgStyles} src="/VAADIN/assets/chatbot.png" alt="chatbot-icon"/>
                    <h1 className="text-justify ms-2">Welcome to OpenAi Chatbot RAG</h1>
                </div>
            </div>
        </div>
    )
}
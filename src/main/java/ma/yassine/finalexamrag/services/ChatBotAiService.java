package ma.yassine.finalexamrag.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import java.util.List;
import java.util.Map;


@BrowserCallable
@AnonymousAllowed
public class ChatBotAiService {
    private final ChatClient chatClient;
    private final VectorStore vectorStore;
    @Value("classpath:/prompts/prompt-template.st")
    private Resource promptTemplate;

    public ChatBotAiService(ChatClient.Builder chatClient, VectorStore vectorStore) {
        this.chatClient = chatClient.build();
        this.vectorStore = vectorStore;
    }

    public String ragChat(String question) {
        List<Document> similarities = vectorStore.similaritySearch(question);
        List<String> context = similarities.stream().map(Document::getContent).toList();
        PromptTemplate promptTemplate1 = new PromptTemplate(promptTemplate);
        Prompt prompt = promptTemplate1.create(Map.of("context", context, "question", question));
        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
}

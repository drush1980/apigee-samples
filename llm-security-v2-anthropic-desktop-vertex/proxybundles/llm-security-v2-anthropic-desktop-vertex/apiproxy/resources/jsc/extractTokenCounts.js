context.setVariable("is_message_delta", false);
try {
    var rawContent = context.getVariable("response.event.current.data");
    if (rawContent) {
        var data = JSON.parse(rawContent);
        if (data && data.type === "message_delta" && data.usage) {
            var inputTokens = parseInt(data.usage.input_tokens || "0", 10);
            var outputTokens = parseInt(data.usage.output_tokens || "0", 10);
            var totalTokens = inputTokens + outputTokens;

            context.setVariable("prompt_token_count", inputTokens);
            context.setVariable("candidates_token_count", outputTokens);
            context.setVariable("total_token_count", totalTokens);
            context.setVariable("is_message_delta", true);
        }
    }
} catch (e) {
    // Ignore JSON parsing issues
}

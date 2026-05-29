var requestPayload = JSON.parse(context.getVariable("request.content"));

// Extract and store model parameter dynamically from payload body to use in target routing
if (requestPayload.model) {
    context.setVariable("extracted_model_name", requestPayload.model);
    // Remove native 'model' body payload key as Vertex AI specifies this parameter via URL segment
    delete requestPayload.model;
} else {
    // Default fallback model in case it is missing from client body request payload
    context.setVariable("extracted_model_name", "claude-haiku-4-5");
}

// Inject Vertex-specific anthropic version field if missing
if (!requestPayload.anthropic_version) {
    requestPayload.anthropic_version = "vertex-2023-10-16";
}

// Ensure streaming parameter is explicitly enabled inside payload passed to Vertex AI
requestPayload.stream = true;

context.setVariable("request.content", JSON.stringify(requestPayload));

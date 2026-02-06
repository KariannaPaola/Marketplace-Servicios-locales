
export default function ChatClient({setContent, isProvider,loading, handleHire, messages, content, handleSendMessage, chat, setChat,  Id_provider, }){

return(
  <div style={{ border: "1px solid #ccc", padding: "1rem", maxWidth: "400px" }}>
      <h3>Chat</h3>
      {isProvider? "": <button disabled={loading} onClick={handleHire}>
      {loading ? "Creando..." : "Contratar"}</button> } 
      <div style={{ height: "300px", overflowY: "auto", marginBottom: "1rem" }}>
        {messages?.map((msg) => (
          <div
            key={msg._id}
            style={{
              margin: "0.5rem 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "0.5rem",
                borderRadius: "5px",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe un mensaje"
          style={{ flex: 1 }}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
)

}
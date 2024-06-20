import { useState, useEffect } from "react";
import { Container, Text, VStack, Button, Input, Textarea, Box, HStack } from "@chakra-ui/react";
import { getLogs, createLog, updateLog, deleteLog } from "../api/logApi";

const Index = () => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({ mood: "", free_text: "", tags: "", urges: "" });
  const [editLogId, setEditLogId] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await getLogs();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleCreateLog = async () => {
    try {
      await createLog(newLog);
      setNewLog({ mood: "", free_text: "", tags: "", urges: "" });
      fetchLogs();
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  const handleUpdateLog = async (id) => {
    try {
      await updateLog(id, newLog);
      setNewLog({ mood: "", free_text: "", tags: "", urges: "" });
      setEditLogId(null);
      fetchLogs();
    } catch (error) {
      console.error("Error updating log:", error);
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      await deleteLog(id);
      fetchLogs();
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  const handleEditLog = (log) => {
    setNewLog(log);
    setEditLogId(log.id);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Mood Logs</Text>
        <Box width="100%">
          <Input placeholder="Mood" value={newLog.mood} onChange={(e) => setNewLog({ ...newLog, mood: e.target.value })} />
          <Textarea placeholder="Free Text" value={newLog.free_text} onChange={(e) => setNewLog({ ...newLog, free_text: e.target.value })} />
          <Input placeholder="Tags" value={newLog.tags} onChange={(e) => setNewLog({ ...newLog, tags: e.target.value })} />
          <Input placeholder="Urges" value={newLog.urges} onChange={(e) => setNewLog({ ...newLog, urges: e.target.value })} />
          <Button onClick={editLogId ? () => handleUpdateLog(editLogId) : handleCreateLog} mt={2}>
            {editLogId ? "Update Log" : "Create Log"}
          </Button>
        </Box>
        <VStack spacing={2} width="100%">
          {logs.map((log) => (
            <Box key={log.id} p={4} borderWidth={1} borderRadius="md" width="100%">
              <Text>Mood: {log.mood}</Text>
              <Text>Free Text: {log.free_text}</Text>
              <Text>Tags: {log.tags}</Text>
              <Text>Urges: {log.urges}</Text>
              <HStack spacing={2} mt={2}>
                <Button size="sm" onClick={() => handleEditLog(log)}>
                  Edit
                </Button>
                <Button size="sm" onClick={() => handleDeleteLog(log.id)}>
                  Delete
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
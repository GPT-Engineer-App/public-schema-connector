import React, { useState, useEffect } from 'react';
import { Container, Text, VStack, Button, Input, Textarea, Box, HStack } from "@chakra-ui/react";

const API_BASE_URL = "https://mhapffvggkbqlfbhfxsy.supabase.co/rest/v1/log";

const Index = () => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({ mood: "", free_text: "", tags: "", urges: "" });
  const [editLog, setEditLog] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'YOUR_API_KEY'
        }
      });
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const createLog = async () => {
    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'YOUR_API_KEY'
        },
        body: JSON.stringify(newLog)
      });
      setNewLog({ mood: "", free_text: "", tags: "", urges: "" });
      fetchLogs();
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  const updateLog = async (id) => {
    try {
      await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'YOUR_API_KEY'
        },
        body: JSON.stringify(editLog)
      });
      setEditLog(null);
      fetchLogs();
    } catch (error) {
      console.error("Error updating log:", error);
    }
  };

  const deleteLog = async (id) => {
    try {
      await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'YOUR_API_KEY'
        }
      });
      fetchLogs();
    } catch (error) {
      console.error("Error deleting log:", error);
    }
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
          <Button onClick={createLog} colorScheme="teal" mt={2}>Create Log</Button>
        </Box>
        {logs.map(log => (
          <Box key={log.id} p={4} shadow="md" borderWidth="1px" width="100%">
            {editLog && editLog.id === log.id ? (
              <>
                <Input placeholder="Mood" value={editLog.mood} onChange={(e) => setEditLog({ ...editLog, mood: e.target.value })} />
                <Textarea placeholder="Free Text" value={editLog.free_text} onChange={(e) => setEditLog({ ...editLog, free_text: e.target.value })} />
                <Input placeholder="Tags" value={editLog.tags} onChange={(e) => setEditLog({ ...editLog, tags: e.target.value })} />
                <Input placeholder="Urges" value={editLog.urges} onChange={(e) => setEditLog({ ...editLog, urges: e.target.value })} />
                <Button onClick={() => updateLog(log.id)} colorScheme="teal" mt={2}>Update Log</Button>
                <Button onClick={() => setEditLog(null)} colorScheme="red" mt={2}>Cancel</Button>
              </>
            ) : (
              <>
                <Text>Mood: {log.mood}</Text>
                <Text>Free Text: {log.free_text}</Text>
                <Text>Tags: {log.tags}</Text>
                <Text>Urges: {log.urges}</Text>
                <HStack spacing={2} mt={2}>
                  <Button onClick={() => setEditLog(log)} colorScheme="teal">Edit</Button>
                  <Button onClick={() => deleteLog(log.id)} colorScheme="red">Delete</Button>
                </HStack>
              </>
            )}
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
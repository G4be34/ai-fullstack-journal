export const createURL = (path) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const res = await fetch(new Request(createURL("/api/journal")), {
    method: "POST",
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.error("Error creating new entry:", res.statusText);
    throw new Error(res.statusText);
  }
};

export const updateEntry = async (id, content) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`)), {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.error("Error updating entry:", res.statusText);
    throw new Error(res.statusText);
  }
};

export const askQuestion = async (question) => {
  const res = await fetch(new Request(createURL("/api/question")), {
    method: "POST",
    body: JSON.stringify({ question }),
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.error("Error asking question:", res.statusText);
    throw new Error(res.statusText);
  }
};

export const deleteEntry = async (id) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`)), {
    method: "DELETE",
  });

  if (!res.ok) {
    console.error("Error deleting entry:", res.statusText);
  }
};

export const verifyUser = async (email) => {
  const res = await fetch(
    new Request(createURL(`/api/verify?email=${email}`)),
    {
      method: "GET",
    }
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.error("Error reaching database to verify user:", res.statusText);
    throw new Error(res.statusText);
  }
};

export const getEntries = async () => {
  const res = await fetch(new Request(createURL("/api/journal")), {
    method: "GET",
  });

  console.log("Response: ", res);
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.error("Error fetching entries:", res.statusText);
    throw new Error(res.statusText);
  }
};

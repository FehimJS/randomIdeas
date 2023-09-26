class getIdeas {
  constructor() {
    this.apiURL = "/api/ideas/";
  }
  getIdeas() {
    try {
      return fetch(this.apiURL);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  async createIdea(data) {
    console.log("Dat being sent:", JSON.stringify(data));
    try {
      const res = await fetch(this.apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await res.json();
      return responseData;
    } catch (error) {
      console.error("Error: ", error);
      throw new Error("Error creating idea: " + error.message);
    }
  }
  deleteIdea(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";
    console.log("Username : ", username);
    return fetch(`${this.apiURL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
  }
}
const ideas = new getIdeas();
export default ideas;

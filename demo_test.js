Feature("DEMO");

let authToken; // Biến để lưu trữ token
//Hook chung cho tất cả các scenario trong feature
Before(async ({ I }) => {
  const loginResponse = await I.sendPostRequest("/api/users/auth/login", {
    email: "trungksdoa@gmail.com",
    password: "123567890",
  });

  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    message: "Login successful",
  });

  authToken = loginResponse.data.data.accessToken;
  I.amBearerAuthenticated(authToken);
});

After(async ({ I }) => {
  //
});

//Kết thúc hook chung cho tất cả các scenario trong feature
let blogId = 1;
Scenario("POST", async ({ I }) => {
  const formData = new FormData();
  formData.append(
    "blog",
    JSON.stringify({
      title: "This is a blog DEMO title: "+new Date().toISOString(),
      headerTop: "This is a blog DEMO header",
      contentTop: "This is a blog DEMO content",
      headerMiddle: "This is a blog DEMO header",
      contentMiddle: "This is a blog DEMO content",
    })
  );
  formData.append("headerImage", "");
  formData.append("bodyImage", "");
  const response = await I.sendPostRequest("/api/blogs", formData);

  console.log(response)
  blogId = response.data.data.id;
  I.seeResponseCodeIsSuccessful();
});

Scenario("GET", async ({ I }) => {
  await I.sendGetRequest("/api/blogs/");
  I.seeResponseCodeIsSuccessful();
});

Scenario("PUT", async ({ I }) => {
  const formData = new FormData();
  formData.append(
    "blog",
    JSON.stringify({
      title: "This is a blog DEMO title: "+new Date().toISOString(),
      headerTop: "This is a blog DEMO PUT header",
      contentTop: "This is a blog DEMO PUT content",
      headerMiddle: "This is a blog DEMO header",
      contentMiddle: "This is a blog DEMO content",
    })
  );
  formData.append("headerImage", "");
  formData.append("bodyImage", "");
  const response = await I.sendPutRequest("/api/blogs/" + blogId, formData);
  I.seeResponseCodeIsSuccessful();
  console.log(response.data.data);
});

Scenario("DELETE", async ({ I }) => {

});

Scenario("GET BY ID", async ({ I }) => {
  const response = await I.sendGetRequest("/api/blogs/" + blogId);
  I.seeResponseCodeIsSuccessful();
  console.log(response.data.data);
});

Scenario("GET package BY ID", async ({ I }) => {
  const response = await I.sendGetRequest("/api/package/" + "1");
  I.seeResponseCodeIsSuccessful();
  console.log(response.data.data);
});

const { I } = require("codeceptjs");
const crypto = require("crypto");
const Joi = require("joi");
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
  //clg
  console.log("Log: clear data example")
});

//Kết thúc hook chung cho tất cả các scenario trong feature
let blogId = 1;
Scenario("POST", async ({ I }) => {
  const formData = new FormData();
  formData.append(
    "blog",
    JSON.stringify({
      title: "This is a blog Test title",
      headerTop: "This is a blog Test header",
      contentTop: "This is a blog Test content",
      headerMiddle: "This is a blog Test header",
      contentMiddle: "This is a blog DET estMO content",
    })
  );
  formData.append("headerImage", "");
  formData.append("bodyImage", "");
  const response = await I.sendPostRequest("/api/blogs", formData);
  blogId = response.data.data.id;

  I.seeResponseContainsJson({ 
    message: 'Created blog successfully',
    statusCode: 201,
    data: {
      title: "This is a blog Test title"
    }
  });

  I.seeResponseCodeIsSuccessful();
});

Scenario("GET", async ({ I }) => {
  await I.sendGetRequest("/api/blogs");
  I.seeResponseCodeIsSuccessful();
});

Scenario("PUT", async ({ I }) => {
  const formData = new FormData();
  formData.append(
    "blog",
    JSON.stringify({
      title: "This is update for a blog title",
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

  I.seeResponseContainsJson({ 
    data: {
      title: "This is update for a blog title"
    }
  });
});

Scenario("DELETE", async ({ I }) => {
  const response = await I.sendDeleteRequest("/api/blogs/" + blogId);
  I.seeResponseCodeIsSuccessful();
});

Scenario("GET BY ID", async ({ I }) => {
  const response = await I.sendGetRequest("/api/blogs/" + blogId);
  I.seeResponseCodeIs(404);
});

Scenario("GET package BY ID", async ({ I }) => {
  const response = await I.sendGetRequest("/api/package/" + "1");
  I.seeResponseCodeIsSuccessful();
  console.log(response.data.data);
});

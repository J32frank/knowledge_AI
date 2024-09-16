/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_AI;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const handleGenerate_AI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'i am currently studying, i want you to generate an educative, fast learning and understanding course with time allocated and a about on each lesson and also a suggested Reading material of two With keys Topic cover in each lesson based on the following: \nlevels: "intermediate"\nTopic: "Nextjs"\nDescription: " I have stated learning nextjs over a month but when i stop learning and want to do my own work, I  will not know what do"\nLesson or Chapter: "5"\n\nCourse Goal: "practical"\nin JSON \n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_name": "Next.js Mastery: From Beginner to Builder",\n  "level": "Intermediate",\n  "description": "This course helps you solidify your Next.js knowledge and confidently build real-world applications.  We\'ll focus on practical skills and common scenarios, ensuring you can independently tackle projects.",\n  "lessons": [\n    {\n      "chapter": 5,\n      "title": "Dynamic Routing & Data Fetching: Powering Interactive Experiences",\n      "time_allocated": "1.5 hours",\n      "about": "Dive deep into dynamic routing, a key feature of Next.js that allows you to create dynamic pages based on user input or data. We\'ll explore different data fetching methods, including Server-Side Rendering (SSR), Static Site Generation (SSG), and Client-Side Rendering (CSR), and learn how to choose the right approach for your specific needs.",\n      "key_topics": [\n        "Dynamic Routing in Next.js",\n        "Data Fetching Strategies (SSR, SSG, CSR)",\n        "getStaticProps and getServerSideProps",\n        "API Routes and Data Integration",\n        "Building a simple blog application with dynamic routing"\n      ],\n      "reading_materials": [\n        {\n          "title": "Next.js Documentation - Routing",\n          "link": "https://nextjs.org/docs/app/building-your-application/routing"\n        },\n        {\n          "title": "Data Fetching in Next.js",\n          "link": "https://nextjs.org/docs/app/building-your-application/data-fetching"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Explanation of the JSON structure:**\n\n* **course_name:** The overall title of the course.\n* **level:**  Indicates the target audience level (Intermediate).\n* **description:** A brief overview of the course and its purpose.\n* **lessons:** An array containing details for each lesson.\n* **chapter:** Identifies the specific lesson number.\n* **title:**  A descriptive title for the lesson.\n* **time_allocated:** Estimated time needed to complete the lesson.\n* **about:** A brief description of what the lesson covers.\n* **key_topics:** A list of the main concepts and skills students will learn in the lesson.\n* **reading_materials:**  An array of recommended resources to further explore the lesson\'s topics.\n\n**Chapter 5: Dynamic Routing & Data Fetching**\n\nThis lesson dives into the core of building interactive web applications with Next.js. You\'ll learn:\n\n* **Dynamic Routing:**  How to create pages whose content changes based on parameters in the URL (e.g., showing a blog post based on its unique ID).\n* **Data Fetching Methods:** Explore the powerful options for loading data in Next.js:\n    * **Server-Side Rendering (SSR):**  Data is fetched on the server, resulting in fully rendered HTML sent to the browser.\n    * **Static Site Generation (SSG):** Pages are pre-rendered at build time, ideal for static content.\n    * **Client-Side Rendering (CSR):** Data is fetched after the page is loaded, good for dynamic and interactive features.\n* **Building a Blog Application:**  Put your knowledge into practice by constructing a simple blog with dynamic routing, displaying posts based on their URLs.\n\n**Recommended Reading Materials:**\n\n* The official Next.js documentation provides in-depth explanations of routing and data fetching.\n* Articles and tutorials on specific data fetching strategies, like SSR and SSG, can further your understanding.\n\nThis structured format helps you organize your learning, efficiently progress through the course, and develop practical Next.js skills. \n',
        },
      ],
    },
  ],
});

export const handleStartCourse_Ai = model.startChat({
  generationConfig,
// safetySettings: Adjust safety settings
// See https://ai.google.dev/gemini-api/docs/safety-settings
history: [
  {
    role: "user",
    parts: [
      {text: "`Explain the concept in detail on the Topic: blender and on the Chapter: fundamental of blender, with a list of arrays, with fields as title, description on the topic and the chapter, and give a coding Example if applicable in a (<precode> format) if applicable to the given title and chapter in a JSON format.`;"},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "```json\n[\n  {\n    \"title\": \"Blender: Introduction\",\n    \"description\": \"Blender is a free and open-source 3D creation suite. It allows users to model, sculpt, animate, render, and composite 3D graphics. It's a powerful and versatile tool used in various fields like film, game development, and architecture.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"User Interface Overview\",\n    \"description\": \"Blender's interface is organized into several key areas: the 3D Viewport, the Toolbar, the Properties Panel, and the Outliner.  Understanding these areas is crucial for navigating the program.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Navigation and View Manipulation\",\n    \"description\": \"Blender provides various methods for navigating the 3D space, including orbit, pan, zoom, and rotating the camera view. These tools are essential for interacting with your scene and creating the desired perspectives.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Selection and Manipulation\",\n    \"description\": \"Selecting and manipulating objects is fundamental to 3D modeling. Blender offers various selection modes, including vertex, edge, and face selection, as well as tools for moving, rotating, and scaling objects.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Basic Modeling with Mesh Objects\",\n    \"description\": \"Mesh objects are the building blocks of most 3D models.  Blender provides tools for creating and manipulating meshes, including the primitive shapes (cube, sphere, cylinder) and the ability to extrude, bevel, and loop cut for complex geometries.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Materials and Textures\",\n    \"description\": \"Materials define the appearance of objects in Blender.  They can be assigned colors, textures, and various properties to simulate different surfaces like wood, metal, or fabric.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Lighting and Rendering\",\n    \"description\": \"Lighting plays a crucial role in defining the mood and atmosphere of a 3D scene. Blender offers different light types (point, directional, area) and allows for controlling their intensity, color, and shadow properties. Rendering produces the final 2D image from the 3D scene.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Modifiers\",\n    \"description\": \"Modifiers are powerful tools that allow you to apply non-destructive transformations to objects. Examples include the Subdivision Surface modifier for creating smooth surfaces, the Bevel modifier for adding rounded edges, and the Array modifier for creating repetitive instances of objects.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Working with the Timeline\",\n    \"description\": \"The Timeline in Blender is used for animating objects.  It allows you to create keyframes, which define the object's position, rotation, and scale at different points in time.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Basic Animation Techniques\",\n    \"description\": \"Blender provides various tools for animating objects, including keyframing, constraints, and drivers. This allows you to create dynamic and engaging animations.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Using Python for Scripting\",\n    \"description\": \"Blender supports Python scripting, allowing you to automate repetitive tasks, create custom tools, and extend the functionality of the software.\",\n    \"chapter\": \"Fundamentals of Blender\",\n    \"code\": \"<precode>\\nimport bpy\\n\\n# Get the active object\\nobject = bpy.context.object\\n\\n# Set the object's location\\nobject.location = (1, 2, 3)\\n</precode>\"\n  }\n]\n```"},
    ],
  },
],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());




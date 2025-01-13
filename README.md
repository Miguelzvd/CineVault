# 📽️ cine-vault

**cine-vault** is a web application designed for movie and series enthusiasts, providing an easy and organized way to save, track, and manage your favorite content. If you’re someone who always forgets to watch a movie or series, or you want to track which episodes you've watched, this project is made just for you!

---

## 🎞️ **Check Out cine-vault!**

You can explore **cine-vault** in two ways:

1. **Access the Live Version:**  
   You can access the hosted project on Vercel here: <a href="https://cine-vault-prod.vercel.app/" target="_blank">cine-vault</a>.
   No setup required, just start using it directly!

2. **Run Locally:**  
   If you'd like to run the project on your own system, follow the steps below.

---

# 💡 About the Project

**cine-vault** was built with the goal of offering a unique experience to users who wish to:

- Search and save movies, series, or episodes for future viewing.
- Track the progress of watched content, allowing users to mark what has been seen and what still needs to be watched.
- Easy navigation, with a pagination system for larger results.
- Interactive and visual metrics, making the experience more fun and dynamic, giving users clear insights into their watching progress.

The project also features an intelligent search input for easily finding the desired content and a responsive interface that ensures a great experience across all devices, whether on desktop, tablet, or mobile.

---

## 🚀 **Getting Started**

Follow these steps to set up and run the project locally:

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd cine-vault.io
```

### **2. Include the API Key**

1. Visit [OMDb API](https://www.omdbapi.com/apikey.aspx) and register to create a free API key.
2. After obtaining your API key, follow these steps:

With the project open, create a file named `.env` in the root directory. Inside the file, add the following line:

```javascript
VITE_API_KEY = "your_api_key_here";
```

Replace `your_api_key_here` with the API key you received from OMDb in your e-mail.

### **3. Install Dependencies**

Make sure you have Node.js installed. Then, install the project dependencies:

```bash
npm install
```

### **4. Run the Development Server**

Start the application in development mode:

```bash
npm run dev
```

---

## 🌐 **Application Access**

The application will be accessible at:  
**`http://localhost:5173`**

---

## 🛠 **Technologies Used**

This project is built using:

- **Vercel**: Used for deploying the project.
- **Tailwind CSS**: For styling and responsive design.
- **shadcn/ui**: Provides reusable components.
- **Magic UI**: Adds additional visual enhancements.
- **Axios**: Used for making HTTP requests to fetch content.
- **React Query**: Manages server-state data fetching, caching, and synchronization.
- **Sonner**: A modern toast notification library to display success and error messages.

---

## 📂 **Project Structure**

- **`/src`**: Contains all the source code, including components, hooks, and pages.
- **`/public`**: Static assets like images and icons.
- **`/styles`**: Custom styling configurations, including Tailwind settings.

---

## ✨ **Features**

- **Save Content**: Save movies and series to watch later.
- **Watch Tracking**: Mark content as watched or unwatched.
- **Progress Monitoring**: View progress for movies, series, and episodes.
- **Responsive Design**: Optimized for all screen sizes.

---

## 📜 **License**

This project is licensed under the **[MIT License](LICENSE)**.

---

### 🤝 **Contribute**

Feel free to:

- Suggest new features.
- Report bugs via the repository's issue tracker.
- Contribute to the codebase.

Thank you for your support! 😊

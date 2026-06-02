# PostgreSQL Setup Guide for PisofMind (Windows)

## Step 1: Download PostgreSQL

1. Go to: https://www.postgresql.org/download/windows/
2. Click **"Download the installer"**
3. Download the **latest version** (PostgreSQL 16 or newer)

---

## Step 2: Install PostgreSQL

### Installation Steps:

1. **Run the installer** (postgresql-VERSION-windows-x64.exe)
2. **Setup Wizard appears:**
   - Click **Next** on welcome screen
   - Installation directory: Use default `C:\Program Files\PostgreSQL\16`
   - Click **Next**

3. **Select Components:**
   - ✅ PostgreSQL Server
   - ✅ pgAdmin 4
   - ✅ Stack Builder
   - ✅ Command Line Tools
   - Click **Next**

4. **Data Directory:**
   - Keep default: `C:\Program Files\PostgreSQL\16\data`
   - Click **Next**

5. **Password:**
   - **IMPORTANT:** Enter password: `postgres`
   - Confirm: `postgres`
   - NOTE: This is for the default `postgres` superuser
   - Click **Next**

6. **Port:**
   - Keep default: `5432`
   - Click **Next**

7. **Locale:**
   - Keep default (English, United States)
   - Click **Next**

8. **Review:**
   - Click **Next** to proceed with installation

9. **Installation Progress:**
   - Wait for installation to complete (~2-3 minutes)
   - Click **Finish**

---

## Step 3: Verify Installation

1. **Search Windows** for "pgAdmin"
2. **Open pgAdmin 4** (web browser opens with pgAdmin dashboard)
3. You should see **Servers** → **PostgreSQL** in the left panel
4. Expand and verify connection works

---

## Step 4: Create PisofMind Database

### Method 1: Using pgAdmin (GUI) - RECOMMENDED

1. Open **pgAdmin 4**
2. Right-click **Databases** → **Create** → **Database**
3. In dialog:
   - **Database name:** `pisofmind` (lowercase)
   - **Owner:** `postgres`
   - Click **Save**
4. New database `pisofmind` appears in list ✅

### Method 2: Using PowerShell (Command Line)

```powershell
# Open PowerShell and run:
psql -U postgres -c "CREATE DATABASE pisofmind;"

# You'll be prompted for password: postgres
# If successful, you'll see: CREATE DATABASE
```

---

## Step 5: Verify Database Connection

1. In **pgAdmin**, click on `pisofmind` database
2. Top menu: **Tools** → **Query Tool**
3. Run test query:
   ```sql
   SELECT NOW();
   ```
4. You should see current timestamp ✅

---

## Step 6: Verify PisofMind Application Properties

The `application.properties` is already configured:

```properties
# Database Configuration - PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/pisofmind
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# Flyway will auto-run migrations on app startup
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
```

✅ **No changes needed!** The connection string matches your PostgreSQL setup.

---

## Step 7: Start the Spring Boot Application

From project directory:

```powershell
cd c:\Users\vinzj\Downloads\PisofMind\PisofMind
.\mvnw.cmd spring-boot:run
```

**What happens:**
1. Spring Boot starts
2. Flyway discovers migrations in `src/main/resources/db/migration/`
3. Flyway auto-executes `V1__Create_Users_Table.sql`
4. Tables created in PostgreSQL ✅
5. App ready at `http://localhost:8080`

---

## Troubleshooting

### "Connection refused" error?
- ✅ Make sure PostgreSQL is running
- Windows: Search for "Services" → find "PostgreSQL" → verify it's "Running"

### "password authentication failed"?
- ✅ Check password is exactly: `postgres`
- Case-sensitive on some systems

### "Database 'pisofmind' does not exist"?
- ✅ Verify you created the database (Step 4)
- Run: `psql -U postgres -l` (lists all databases)

### "Listen on 5432 failed"?
- ✅ Port already in use
- Change `application.properties` to different port (5433)
- Or stop what's using 5432

---

## Next Steps After Setup

1. ✅ Verify PostgreSQL installed and running
2. ✅ Create `pisofmind` database
3. ✅ Start Spring Boot app
4. ✅ Check Flyway migrations run automatically
5. ✅ Ready to test API endpoints!

---

**Continue when ready!** Let me know once PostgreSQL is installed. 🚀

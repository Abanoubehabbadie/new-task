# Excel File Format Guide for Exam Template Generator

## Required Excel Sheets

### Sheet 1: COURSES
Import your courses with this format:

| Course Name | Course Code | Semester | Degree Level | Department |
|-------------|------------|----------|--------------|------------|
| Database Systems | CS-201 | 2 | Bachelor | Computer Science |
| Web Development | CS-301 | 3 | Bachelor | Computer Science |
| Machine Learning | CS-401 | 4 | Master | Computer Science |
| Data Structures | CS-101 | 1 | Bachelor | Computer Science |
| Operating Systems | CS-202 | 2 | Bachelor | Computer Science |

**Column Requirements:**
- **Course Name** (Text): Full name of the course
- **Course Code** (Text): Unique course identifier (e.g., CS-201)
- **Semester** (Number): 1-8 (typically)
- **Degree Level** (Text): Bachelor, Master, PhD, Diploma, etc.
- **Department** (Text): Department name

---

### Sheet 2: EXAM_SETTINGS (Optional)
Configure default exam settings:

| Setting | Value |
|---------|-------|
| Institution Name | Your University Name |
| Institution Logo URL | https://example.com/logo.png |
| Default Exam Duration | 2 hours |
| Default Total Marks | 100 |
| Standard Instructions | See below |

**Custom Instructions Example:**
```
1. Answer all questions
2. Show all calculations
3. No unauthorized materials
4. Write clearly
5. Sign your examination sheet
```

---

### Sheet 3: DEGREE_LEVELS (Optional)
Define degree levels in your institution:

| Level | Description | Years |
|-------|-------------|-------|
| Diploma | Diploma Program | 2 |
| Bachelor | Bachelor Degree | 4 |
| Master | Master Degree | 2 |
| PhD | Doctoral Degree | 3-4 |

---

## Example Excel File Structure

```
📄 COURSES_DATABASE.xlsx
├── Sheet 1: COURSES
├── Sheet 2: EXAM_SETTINGS
└── Sheet 3: DEGREE_LEVELS
```

---

## How to Create Your Excel File

1. **Open Excel or Google Sheets**
2. **Create Sheet 1 - COURSES**
   - Add column headers in Row 1
   - Start data from Row 2
   - One course per row

3. **Create Sheet 2 - EXAM_SETTINGS** (Optional)
   - Institution name and logo
   - Default exam parameters
   - Standard instructions

4. **Create Sheet 3 - DEGREE_LEVELS** (Optional)
   - List all degree levels

5. **Save as .xlsx file**

6. **Upload to the system**

---

## Required Information for Word Generation

When generating an exam template, the system needs:

```json
{
  "courseId": "ID from COURSES sheet",
  "examType": "Quiz | Practical | Final | Midterm | Assignment",
  "date": "YYYY-MM-DD",
  "examinerName": "Dr./Prof. Name",
  "institutionLogo": "URL or file path"
}
```

---

## Tips & Best Practices

✅ **Course Code Format**: Use consistent format (e.g., CS-201, MATH-101)
✅ **Semester Numbering**: Use 1-8 range
✅ **Logo**: Use high-resolution images (PNG/JPG recommended)
✅ **No Special Characters**: Avoid special characters in course names
✅ **Unique Codes**: Ensure each course code is unique
✅ **Department Names**: Keep consistent across all courses

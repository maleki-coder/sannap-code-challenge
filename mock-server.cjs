// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.post("/DEY/agent/verification/signup/create_otp", (req, res) => {
  setTimeout(() => {
    res.json({
      message: "This is a delayed mock response",
      success: true,
    });
  }, 2000);
});

app.post(`/DEY/agent/verification/signup/validate_otp`, (req, res) => {
  setTimeout(() => {
    res.json({
      message: "This is a delayed mock response",
      success: true,
    });
  }, 1000);
});
app.get("/base/provinces_wop", (req, res) => {
  setTimeout(() => {
    res.json({
      message: "List of provinces in Iran",
      success: true,
      data: [
        { code: "01", name: "Tehran", translation: "تهران" },
        { code: "02", name: "Isfahan", translation: "اصفهان" },
        { code: "03", name: "Khorasan Razavi", translation: "خراسان رضوی" },
        { code: "04", name: "Fars", translation: "فارس" },
        { code: "05", name: "Mazandaran", translation: "مازندران" },
        { code: "06", name: "East Azerbaijan", translation: "آذربایجان شرقی" },
        { code: "07", name: "West Azerbaijan", translation: "آذربایجان غربی" },
        { code: "08", name: "Gilan", translation: "گیلان" },
        { code: "09", name: "Alborz", translation: "البرز" },
        { code: "10", name: "Hormozgan", translation: "هرمزگان" },
      ],
    });
  }, 1000);
});

app.get("/base/counties_wop", (req, res) => {
  const citiesByProvince = {
    "01": [
      { name: "Tehran", translation: "تهران", code: "101" },
      { name: "Karaj", translation: "کرج", code: "102" },
      { name: "Varamin", translation: "ورامین", code: "103" },
    ],
    "02": [
      { name: "Isfahan", translation: "اصفهان", code: "201" },
      { name: "Kashan", translation: "کاشان", code: "202" },
      { name: "Najafabad", translation: "نجف‌آباد", code: "203" },
    ],
    "03": [
      { name: "Mashhad", translation: "مشهد", code: "301" },
      { name: "Sabzevar", translation: "سبزوار", code: "302" },
      { name: "Neyshabur", translation: "نیشابور", code: "303" },
    ],
    "04": [
      { name: "Shiraz", translation: "شیراز", code: "401" },
      { name: "Marvdasht", translation: "مرودشت", code: "402" },
      { name: "Jahrom", translation: "جهرم", code: "403" },
    ],
    "05": [
      { name: "Sari", translation: "ساری", code: "501" },
      { name: "Amol", translation: "آمل", code: "502" },
      { name: "Babol", translation: "بابل", code: "503" },
    ],
    "06": [
      { name: "Tabriz", translation: "تبریز", code: "601" },
      { name: "Maragheh", translation: "مراغه", code: "602" },
      { name: "Ahar", translation: "اهر", code: "603" },
    ],
    "07": [
      { name: "Urmia", translation: "ارومیه", code: "701" },
      { name: "Khoy", translation: "خوی", code: "702" },
      { name: "Maku", translation: "ماکو", code: "703" },
    ],
    "08": [
      { name: "Rasht", translation: "رشت", code: "801" },
      { name: "Lahijan", translation: "لاهیجان", code: "802" },
      { name: "Anzali", translation: "انزلی", code: "803" },
    ],
    "09": [
      { name: "Karaj", translation: "کرج", code: "901" },
      { name: "Hashtgerd", translation: "هشتگرد", code: "902" },
      { name: "Nazarabad", translation: "نظرآباد", code: "903" },
    ],
    10: [
      { name: "Bandar Abbas", translation: "بندرعباس", code: "1001" },
      { name: "Qeshm", translation: "قشم", code: "1002" },
      { name: "Minab", translation: "میناب", code: "1003" },
    ],
  };

  const { province_code } = req.query;
  const cities = citiesByProvince[province_code];

  if (cities) {
    res.json({
      message: `List of cities in province ${province_code}`,
      success: true,
      data: cities,
    });
  } else {
    res.status(404).json({
      message: "Province code not found",
      success: false,
    });
  }
});

app.get("/selection_item/insurance_branch/wop_list", (req, res) => {
  const branchesByRegion = {
    "01": [
      {
        name: "Tehran Branch 1",
        translation: "شعبه تهران یک",
        code: "101",
      },
      {
        name: "Tehran Branch 2",
        translation: "شعبه تهران دو",
        code: "102",
      },
      {
        name: "Tehran Branch 3",
        translation: "شعبه تهران سه",
        code: "103",
      },
    ],
    "02": [
      {
        name: "Isfahan Branch 1",
        translation: "شعبه اصفهان یک",
        code: "201",
      },
      {
        name: "Isfahan Branch 2",
        translation: "شعبه اصفهان دو",
        code: "202",
      },
      {
        name: "Isfahan Branch 3",
        translation: "شعبه اصفهان 3",
        code: "203",
      },
    ],
    "03": [
      {
        name: "Mashhad Branch 1",
        translation: "شعبه مشهد یک",
        code: "301",
      },
      {
        name: "Mashhad Branch 2",
        translation: "شعبه مشهد دو",
        code: "302",
      },
      {
        name: "Mashhad Branch 3",
        translation: "شعبه مشهد سه",
        code: "303",
      },
    ],
    "04": [
      {
        name: "Shiraz Branch 1",
        translation: "شعبه شیراز یک",
        code: "401",
      },
      {
        name: "Shiraz Branch 2",
        translation: "شعبه شیراز دو",
        code: "402",
      },
      {
        name: "Shiraz Branch 3",
        translation: "شعبه شیراز سه",
        code: "403",
      },
    ],
    "05": [
      {
        name: "Sari Branch 1",
        translation: "شعبه ساری یک",
        code: "501",
      },
      {
        name: "Sari Branch 2",
        translation: "شعبه ساری دو",
        code: "502",
      },
      {
        name: "Sari Branch 3",
        translation: "شعبه ساری سه",
        code: "503",
      },
    ],
  };

  const { province_code, search_query } = req.query;

  const branches = branchesByRegion[province_code];

  if (branches) {
    const filteredBranches = branches.filter((branch) =>
      branch.translation.toLowerCase().includes(search_query.toLowerCase())
    );

    // If no branches match the search term
    if (filteredBranches.length === 0) {
      return res.status(404).json({
        message: "No branches found matching your search",
        success: false,
      });
    }

    res.json({
      message: `List of insurance branches in region ${province_code} matching "${search_query}"`,
      success: true,
      data: filteredBranches,
    });
  } else {
    res.status(404).json({
      message: "Region code not found",
      success: false,
    });
  }
});

app.post(`/DEY/agent/verification/signup/check_agency_code`, (req, res) => {
  const { agent_code } = req.body;

  // Check if agentCode is "1204" return error
  if (agent_code === "1204") {
    return res.status(400).json({
      message: "کد نمایندگی 1204 قبلا ثبت شده است",
      success: false,
    });
  }
  setTimeout(() => {
    res.status(200).json({
      message: "This is a delayed mock response",
      success: true,
    });
  }, 1000);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

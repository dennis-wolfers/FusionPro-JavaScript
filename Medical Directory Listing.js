externalDF = new ExternalDataFileEx("\\\\fusion\\Working\\September13\\80571\\_Source\\VDP Setup\\Data\\" + Field("File Name"), "\t");

if(externalDF.valid != true)
{
    Print("Failed to link to the external data file in OnJobStart");
}

listings = "";
var numRecsExtDF = externalDF.recordCount;
var docsInSpecialty = 1;
var currentSpecialty = externalDF.GetFieldValue(1, "Specialty");
var optionalPhone = "";
var languages = "";
var hospitals = "";
var network = "";
var addr2 = "";
var addr3 = "";

for (r=1;r<=numRecsExtDF;++r)
{
    if (externalDF.GetFieldValue(r, "Number1") != "") 
        optionalPhone = "<p keepnext=1 leadafter=400>" + externalDF.GetFieldValue(r, "Area Code1") + " " + externalDF.GetFieldValue(r, "Number1");
    else optionalPhone = "";
    
    if (externalDF.GetFieldValue(r, "Language Spoken") != "")
        languages = "<p keepnext=1 leadafter=400><b>Language Spoken: </b>" + externalDF.GetFieldValue(r, "Language Spoken");
    else languages = "";

    if (externalDF.GetFieldValue(r, "Hospital Affiliations") != "")
        hospitals = "<p keepnext=1 leadafter=400><b>Hospital Affiliations: </b>" + externalDF.GetFieldValue(r, "Hospital Affiliations");
    else hospitals = "";

    if (externalDF.GetFieldValue(r, "Network") != "")
        network = "<p keepnext=1 leadbefore=0>" + externalDF.GetFieldValue(r, "Network");
    else network = "";

    if (externalDF.GetFieldValue(r, "Street Address2") != "")
    {
        addr2 = "<p keepnext=1 leadafter=0><b>Additional Location(s):</b><p keepnext=1>" + externalDF.GetFieldValue(r, "Street Address2") 
        + "<p keepnext=1 leadafter=400>" + externalDF.GetFieldValue(r, "City2") + ", CA " + externalDF.GetFieldValue(r, "Zip2")
        + "<p keepnext=1 leadafter=400>" + externalDF.GetFieldValue(r, "Area Code2") + " " + externalDF.GetFieldValue(r, "Number2");
    } else addr2 = "";
            
    if (externalDF.GetFieldValue(r, "Street Address3") != "")
    {
        addr3 = "<p keepnext=1 leadafter=0>" + externalDF.GetFieldValue(r, "Street Address3") 
        + "<p keepnext=1 leadafter=400>" + externalDF.GetFieldValue(r, "City3") + ", CA " + externalDF.GetFieldValue(r, "Zip3")
        + "<p keepnext=1 leadafter=400>" + externalDF.GetFieldValue(r, "Area Code3") + " " + externalDF.GetFieldValue(r, "Number3");
    } else addr3 = "";

    if (docsInSpecialty == 1) {
		var myTable = new FPTable;
		myTable.AddColumns(26099);
		myTable.AddRows(3);

		myTable.Rows[0].Type = "Header";
		myTable.Rows[0].Cells[0].Margins = new FPTableMargins;
		myTable.Rows[0].Cells[0].Margins.Top = 35;
		myTable.Rows[0].Cells[0].Margins.Bottom = 35;
		myTable.Rows[0].Cells[0].Margins.Left = 400;
		myTable.Rows[0].Cells[0].Margins.right = 400;
		myTable.Rows[0].Cells[0].ShadeColor="Black";
		myTable.Rows[0].Cells[0].ShadePct=15;
		myTable.Rows[0].Cells[0].Font="HelveticaNeueLT Std";
		myTable.Rows[0].Cells[0].TextColor="Black";
		myTable.Rows[0].Cells[0].PointSize=9;
		myTable.Rows[0].SetContents(externalDF.GetFieldValue(r, "Specialty"));

		myTable.Rows[1].Type = "ContinuedHeader";
		myTable.Rows[1].Cells[0].Margins = new FPTableMargins;
		myTable.Rows[1].Cells[0].Margins.Top = 35;
		myTable.Rows[1].Cells[0].Margins.Bottom = 35;
		myTable.Rows[1].Cells[0].Margins.Left = 400;
		myTable.Rows[1].Cells[0].Margins.right = 400;
		myTable.Rows[1].Cells[0].ShadeColor="Black";
		myTable.Rows[1].Cells[0].ShadePct=15;
		myTable.Rows[1].Cells[0].Font="HelveticaNeueLT Std";
		myTable.Rows[1].Cells[0].TextColor="Black";
		myTable.Rows[1].Cells[0].PointSize=9;
		myTable.Rows[1].SetContents(externalDF.GetFieldValue(r, "Specialty") + " (continued)");

		myTable.Rows[2].Cells[0].Margins = new FPTableMargins;
		myTable.Rows[2].Cells[0].Margins.Top = 80;
		myTable.Rows[2].Cells[0].Margins.Bottom = 80;
		myTable.Rows[2].Cells[0].Margins.Left = 0;
		myTable.Rows[2].Cells[0].Margins.right = 0;
		myTable.Rows[2].Cells[0].Font="HelveticaNeueLT Std";
		myTable.Rows[2].Cells[0].TextColor="Black";
		myTable.Rows[2].Cells[0].PointSize=9;
		myTable.Rows[2].SetContents("<p br=\"false\" tabstops=\"0;26090,Right,,\"><b>" + externalDF.GetFieldValue(r, "First Name") + " "
        + externalDF.GetFieldValue(r, "Middle Name") + " "
        + externalDF.GetFieldValue(r, "Last Name") + ", " 
        + externalDF.GetFieldValue(r, "License Type") + "<t>Provider ID: </b>" + externalDF.GetFieldValue(r, "EPIC ID") + "</t>"
        + "<p keepnext=1 leadbefore=70 leadafter=0><i>" + externalDF.GetFieldValue(r, "Group Affiliations")
        + network + "</i>"
        + "<p leadbefore=0 keepnext=1>" + externalDF.GetFieldValue(r, "Street Address 1") 
        + "<p keepnext=1 leadafter=400>" + externalDF.GetFieldValue(r, "City1") + ", CA " 
        + externalDF.GetFieldValue(r, "Zip1")
        + optionalPhone + addr2 + addr3 
        + "<p keepnext=1 leadafter=400><b>Medical Education: </b>" + externalDF.GetFieldValue(r, "MedSchool")
        + "<p keepnext=1 leadafter=400><b>Board Certification: </b>" + externalDF.GetFieldValue(r, "Board Certified")
        + hospitals + languages + "<p tabstops=5760 keepnext=1 leadafter=400><b>Gender: </b>" + externalDF.GetFieldValue(r, "Gender")
        + "<t><b>Accepting New Patients: </b>" + externalDF.GetFieldValue(r, "Accepting New Patients"));
    }
                
	if (docsInSpecialty > 1) {
		myTable.AddRows(1)
		myTable.Rows[(docsInSpecialty + 1)].Cells[0].Margins = new FPTableMargins;
		myTable.Rows[(docsInSpecialty + 1)].Cells[0].Margins.Top = 0;
		myTable.Rows[(docsInSpecialty + 1)].Cells[0].Margins.Bottom = 80;
		myTable.Rows[(docsInSpecialty + 1)].Cells[0].Margins.Left = 0;
		myTable.Rows[(docsInSpecialty + 1)].Cells[0].Margins.right = 0;
		myTable.Rows[(docsInSpecialty + 1)].Cells[0].Font="HelveticaNeueLT Std";
		myTable.Rows[(docsInSpecialty + 1)].Cells[0].TextColor="Black";
		myTable.Rows[(docsInSpecialty + 1)].Cells[0].PointSize=9;
		myTable.Rows[(docsInSpecialty + 1)].SetContents("<p br=\"false\" tabstops=\"0;26090,Right,,\"><b><leading newsize=145>" 
        + externalDF.GetFieldValue(r, "First Name") + " "
        + externalDF.GetFieldValue(r, "Middle Name") + " "
        + externalDF.GetFieldValue(r, "Last Name") + ", " 
        + externalDF.GetFieldValue(r, "License Type") + "<t>Provider ID: </b>" + externalDF.GetFieldValue(r, "EPIC ID") + "</t></leading>"
        + "<p keepnext=1 leadbefore=500 leadafter=0><i>" + externalDF.GetFieldValue(r, "Group Affiliations")
        + network + "</i>"
        + "<p leadbefore=0 keepnext=1>" + externalDF.GetFieldValue(r, "Street Address 1") 
        + "<p keepnext=1 leadafter=400>" + externalDF.GetFieldValue(r, "City1") + ", CA " 
        + externalDF.GetFieldValue(r, "Zip1")
        + optionalPhone + addr2 + addr3 
        + "<p keepnext=1 leadafter=400><b>Medical Education: </b>" + externalDF.GetFieldValue(r, "MedSchool")
        + "<p keepnext=1 leadafter=400><b>Board Certification: </b>" + externalDF.GetFieldValue(r, "Board Certified")
        + hospitals + languages + "<p tabstops=5760 keepnext=1 leadafter=400><b>Gender: </b>" + externalDF.GetFieldValue(r, "Gender")
        + "<t><b>Accepting New Patients: </b>" + externalDF.GetFieldValue(r, "Accepting New Patients"));
	}
        
    if (currentSpecialty == externalDF.GetFieldValue(r + 1, "Specialty")) {
        docsInSpecialty++;
        currentSpecialty = externalDF.GetFieldValue(r + 1, "Specialty");
    } else {
        docsInSpecialty = 1;
        currentSpecialty = externalDF.GetFieldValue(r + 1, "Specialty");
        listings += myTable.MakeTags() + "<p>";
    }
}

return 0;
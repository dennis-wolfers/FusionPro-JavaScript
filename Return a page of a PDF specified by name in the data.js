var graphic = CreateResource("//fusion/Working/Cust_Accts/DST Prepress/__Daily Jobs__/Frontier WFM/Resources/" + ReplaceFileExtension(Field("Form Name"),".pdf"), "graphic", false);
graphic.pagenumber = 2;
return graphic;
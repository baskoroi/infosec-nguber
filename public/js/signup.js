$(document).ready(function() {
	$("#cardNumberInput").hide();
	$("#driverLicenseInput").hide();

	$('input[name="userType"]').on("click", function() {
		if ($('input[name="userType"]:checked').val() === "Passenger") {
			$("#cardNumberInput").show();
			$("#driverLicenseInput").hide();
		} else if ($('input[name="userType"]:checked').val() === "Driver") {
			$("#cardNumberInput").hide();
			$("#driverLicenseInput").show();
		}
	});
});
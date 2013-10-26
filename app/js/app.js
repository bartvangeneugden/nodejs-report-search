$(document).ready(function(){
    $("#searchbox").on('keyup', function(e){
        var text = $(this).val();
        if(text.length > 2){
            $.getJSON('/scala.json?q='+text, showScenarios);
        }
    });
});
function showScenarios(result) {
    $(".scenarioContainer").html("<hr/>");
    $.each(result,function(i, scenario){
        $(".scenarioContainer").append(returnSingleScenario(scenario));
    });
}
function returnSingleScenario(scenario) {
    var scenarioHtml = $("<div/>").addClass('panel panel-default');
    var ul = $("<ul/>");
    scenarioHtml.append(
        $("<div/>").addClass("panel-heading")
            .append($("<h3/>").text(scenario.scope))
            .append($("<span/>").text(" - "+scenario.given))
    );
    scenarioHtml.append(
        $("<div/>").addClass("panel-body")
        .append(ul)
    );
    $.each(scenario.steps, function(i, step){
        ul.append($("<li/>").text(step));
    });
    return scenarioHtml;
}
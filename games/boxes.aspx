<%@ Page Title="ZoneUA | Boxes" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="boxes.aspx.cs" Inherits="boxes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link rel="stylesheet" href="../css/boxesStyle.css" type="text/css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="content">
        <div id="header">
            <h2 class="featurette-heading page-heading"><span class="text-muted">Shoot the</span> BOXES</h2>
        </div>
        <div id="main" role="main">
            <noscript><div class="alert alert-danger">Please enable JavaScript in your browser!</div></noscript>

            
            <canvas id="game" width="800" height="400"></canvas>
            <br />
            <%--<div class="btn-group" id="sound">
                <button type="button" class="btn btn-default" value="0">Sound Off</button>
                <button type="button" class="btn btn-default" value="1">Sound On</button>
            </div>--%>
            
        </div>
        <br />
        <div id="scores">
            <span id="cat">
                <strong>Shots Fired:</strong>
                <span id="shots">0</span>
            </span>

            <span id="cat">
                <strong>Hits:</strong>
                <span id="hits">0</span>
            </span>

            <span id="cat">
                <strong>Misses:</strong>
                <span id="misses">0</span>
            </span>

            <span id="cat">
                <strong>Accuracy:</strong>
                <span id="acc">0</span>
            </span>
        </div>
    </div>
    <script src="../js/boxes/boxesJS.js" type="text/javascript"></script>
</asp:Content>

